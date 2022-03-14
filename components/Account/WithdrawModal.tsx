import { useMutation } from "@apollo/client"
import React, { useState } from "react"
import { toast } from "react-toastify"
import { DEPOSIT, WITHDRAW } from "../../graphql/query/account/fund"
import { GET_MY_PORFOLIO } from "../../graphql/query/account/portfolio"
import usePortfolio from "../../hooks/usePortfolio"
import Modal from "../General/Modal"

interface Props {
  open: boolean
  setOpen: Function
  refetch: Function // function that will be run after mutation for rerendering the parent
  buyingPower: number
}

const WithdrawModal = ({ open, setOpen, refetch, buyingPower }: Props) => {
  const [withdraw, { error }] = useMutation(WITHDRAW, {
    refetchQueries: [{ query: GET_MY_PORFOLIO }],
  })
  const [amount, setAmount] = useState("")
  const [disabled, setDisabled] = useState(true)
  const { portfolioData } = usePortfolio()

  const handleWithdraw = (amount: number) => {
    return withdraw({
      variables: {
        amount,
      },
    })
  }

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (value < 0) return
    if (
      portfolioData &&
      value <= portfolioData.myPortfolio.buyingPower &&
      value > 0
    ) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
    setAmount(e.target.value)
  }

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const value = Number(amount)
    if (value <= 0) return
    try {
      toast.info("Tranasction Loading...")
      await handleWithdraw(value)
      toast.success("Withdraw Successful")
      if (refetch) await refetch()
      toggle()
    } catch (e) {
      toast.error("Withdraw Errro: " + error?.message)
    }
    setAmount("")
  }

  const toggle = () => {
    setOpen((s: boolean) => !s)
  }

  return open ? (
    <Modal title='Withdraw' toggle={toggle}>
      <div>
        <form onSubmit={handleSumbit}>
          <p>Available: {buyingPower}</p>
          <input
            value={amount}
            name='amount'
            type='number'
            onChange={handleAmount}
          />
          <button disabled={disabled} type='submit'>
            Withdraw
          </button>
        </form>
      </div>
    </Modal>
  ) : null
}

export default WithdrawModal
