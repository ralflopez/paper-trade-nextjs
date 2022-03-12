import { useMutation } from "@apollo/client"
import React, { useState } from "react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { DEPOSIT } from "../../graphql/query/account/deposit"
import Modal from "../General/Modal"

interface Props {
  open: boolean
  setOpen: Function
}

const DepositModal = ({ open, setOpen }: Props) => {
  const [deposit, { error }] = useMutation(DEPOSIT)
  const [amount, setAmount] = useState("")
  const [disabled, setDisabled] = useState(true)

  const handleDeposit = async (amount: number) => {
    try {
      await deposit({
        variables: {
          amount,
        },
      })
    } catch (e) {}
  }

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (value < 0) return
    if (value > 1) setDisabled(false)
    else setDisabled(true)
    setAmount(e.target.value)
  }

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const value = Number(amount)
    if (value < 1) return
    toast.info("Tranasction Loading...")
    await handleDeposit(value)
    toast.success("Desposit Successful")
  }

  const toggle = () => {
    setOpen((s: boolean) => !s)
  }

  if (error) toast.error("Deposit Error: " + error.message)

  return open ? (
    <Modal title='Deposit' toggle={toggle}>
      <div>
        <form onSubmit={handleSumbit}>
          <input
            value={amount}
            name='amount'
            type='number'
            onChange={handleAmount}
          />
          <button disabled={disabled} type='submit'>
            Deposit
          </button>
        </form>
      </div>
    </Modal>
  ) : null
}

export default DepositModal
