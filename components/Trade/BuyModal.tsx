import { useMutation } from "@apollo/client"
import React, { useState } from "react"
import { toast } from "react-toastify"
import { GET_MY_PORFOLIO } from "../../graphql/query/account/portfolio"
import { BUY } from "../../graphql/query/account/transaction"
import usePortfolio from "../../hooks/usePortfolio"
import Modal from "../General/Modal"

interface Props {
  assetId: string
  currentPrice: string
  open: boolean
  setOpen: Function
  refetch?: Function // function that will be run after mutation for rerendering the parent
}

const BuyModal = ({ assetId, currentPrice, open, setOpen, refetch }: Props) => {
  const [buy, { error }] = useMutation(BUY, {
    refetchQueries: [{ query: GET_MY_PORFOLIO }],
  })
  const { portfolioData } = usePortfolio()
  const [amount, setAmount] = useState("")
  const [disabled, setDisabled] = useState(true)

  const handleBuy = async (amount: number) => {
    try {
      await buy({
        variables: {
          amount,
          assetId,
        },
      })
    } catch (e) {}
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
    toast.info("Tranasction Loading...")
    await handleBuy(value)
    toast.success("Buy Successful")
    if (refetch) await refetch()
    toggle()
  }

  const toggle = () => {
    setOpen((s: boolean) => !s)
  }

  if (error) toast.error("Deposit Error: " + error.message)

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
            {portfolioData
              ? portfolioData.myPortfolio.buyingPower.toFixed(2)
              : 0}
          </div>
          <div>Total: {Number(currentPrice) * Number(amount)}</div>
          <button disabled={disabled} type='submit'>
            Buy
          </button>
        </form>
      </div>
    </Modal>
  ) : null
}

export default BuyModal
