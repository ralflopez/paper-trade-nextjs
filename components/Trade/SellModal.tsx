import { useMutation } from "@apollo/client"
import React, { useState } from "react"
import { toast } from "react-toastify"
import { GET_MY_PORFOLIO } from "../../graphql/query/account/portfolio"
import { SELL } from "../../graphql/query/account/transaction"
import { NexusGenObjects } from "../../types/nexus-typegen"
import Modal from "../General/Modal"

interface Props {
  currentAsset: CoinCapIo_Asset
  myPortfolio: NexusGenObjects["PortfolioOutput"]
  open: boolean
  setOpen: Function
  refetch?: Function // function that will be run after mutation for rerendering the parent
}

const SellModal = ({
  currentAsset,
  myPortfolio,
  open,
  setOpen,
  refetch,
}: Props) => {
  const [sell, { error }] = useMutation(SELL, {
    refetchQueries: [{ query: GET_MY_PORFOLIO }],
  })
  const [amount, setAmount] = useState("")
  const [disabled, setDisabled] = useState(true)
  const allocation = myPortfolio.allocation.find(
    (a) => a.assetId == currentAsset.id
  )

  const handleBuy = (amount: number) => {
    return sell({
      variables: {
        amount,
        assetId: currentAsset.id,
      },
    })
  }

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (value < 0 || !allocation) return
    if (value > 0 && value <= allocation.total) setDisabled(false)
    else setDisabled(true)
    setAmount(e.target.value)
  }

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const value = Number(amount)
    if (value <= 0) return
    try {
      toast.info("Tranasction Loading...")
      await handleBuy(value)
      if (refetch) await refetch()
      toast.success("Sell Successful")
      toggle()
    } catch (e) {
      toast.error("Sell Error: " + error?.message)
    }
    setAmount("")
  }

  const toggle = () => {
    setOpen((s: boolean) => !s)
  }

  return open ? (
    <Modal title='Sell' toggle={toggle}>
      <div>
        <form onSubmit={handleSumbit}>
          <div className='mb-4'>
            <p>Available Balance</p>
            <p className='text-xl'>{allocation ? allocation.total : 0}</p>
          </div>
          <input
            value={amount}
            name='amount'
            type='number'
            onChange={handleAmount}
            className='p-3 mb-4 bg-white rounded-sm outline-none focus:border-2 border-primary'
          />
          <div className='mb-4'>
            <p>Total</p>
            <p className='text-xl'>
              ${(Number(currentAsset.priceUsd) * Number(amount)).toFixed(2)}
            </p>
          </div>
          <button
            className='p-5 py-2 text-white duration-300 ease-out bg-gray-400 rounded-sm hover:bg-negative'
            disabled={disabled}
            type='submit'
          >
            Sell
          </button>
        </form>
      </div>
    </Modal>
  ) : null
}

export default SellModal
