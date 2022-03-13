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
}

const WithdrawModal = ({ open, setOpen, refetch }: Props) => {
  const [withdraw, { error }] = useMutation(WITHDRAW, {
    refetchQueries: [{ query: GET_MY_PORFOLIO }],
  })
  const [amount, setAmount] = useState("")
  const [disabled, setDisabled] = useState(true)
  const { portfolioData } = usePortfolio()

  const handleWithdraw = async (amount: number) => {
    try {
      await withdraw({
        variables: {
          amount,
        },
      })
    } catch (e) {}
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
    toast.info("Tranasction Loading...")
    await handleWithdraw(value)
    toast.success("Withdraw Successful")
    if (refetch) await refetch()
    setAmount("")
    toggle()
  }

  const toggle = () => {
    setOpen((s: boolean) => !s)
  }

  if (error) toast.error("Deposit Error: " + error.message)

  return open ? (
    <Modal title='Withdraw' toggle={toggle}>
      <div>
        <form onSubmit={handleSumbit}>
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
