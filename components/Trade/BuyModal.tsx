import { useMutation } from "@apollo/client"
import React, { useState } from "react"
import { toast } from "react-toastify"
import { GET_MY_PORFOLIO } from "../../graphql/query/account/portfolio"
import { BUY } from "../../graphql/query/account/transaction"
import { NexusGenObjects } from "../../types/nexus-typegen"
import Modal from "../General/Modal"

interface Props {
  currentAsset: CoinCapIo_Asset
  myPortfolio: NexusGenObjects["PortfolioOutput"]
  open: boolean
  setOpen: Function
  refetch?: Function // function that will be run after mutation for rerendering the parent
}

const BuyModal = ({
  currentAsset,
  myPortfolio,
  open,
  setOpen,
  refetch,
}: Props) => {
  const [buy, { error }] = useMutation(BUY, {
    refetchQueries: [{ query: GET_MY_PORFOLIO }],
  })
  const [amount, setAmount] = useState("")
  const [disabled, setDisabled] = useState(true)

  const handleBuy = (amount: number) => {
    return buy({
      variables: {
        amount,
        assetId: currentAsset.id,
      },
    })
  }

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (value < 0) return
    if (value > 0) setDisabled(false)
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
      toast.success("Buy Successful")
      toggle()
    } catch (e) {
      toast.error("Deposit Error: " + error?.message)
    }
    setAmount("")
  }

  const toggle = () => {
    setOpen((s: boolean) => !s)
  }

  return open ? (
    <Modal title='Buy' toggle={toggle}>
      <div>
        <form onSubmit={handleSumbit}>
          <input
            value={amount}
            name='amount'
            type='number'
            onChange={handleAmount}
          />
          <div>
            Buying Power:
            {myPortfolio ? myPortfolio.buyingPower.toFixed(2) : 0}
          </div>
          <div>Total: {Number(currentAsset.priceUsd) * Number(amount)}</div>
          <button disabled={disabled} type='submit'>
            Buy
          </button>
        </form>
      </div>
    </Modal>
  ) : null
}

export default BuyModal
