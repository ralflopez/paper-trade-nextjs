import { useMutation } from "@apollo/client"
import React, { useState } from "react"
import { toast } from "react-toastify"
import { DEPOSIT } from "../../graphql/query/account/fund"
import { GET_MY_PORFOLIO } from "../../graphql/query/account/portfolio"
import Modal from "../General/Modal"

interface Props {
  open: boolean
  setOpen: Function
  refetch: Function // function that will be run after mutation for rerendering the parent
  buyingPower: number
}

const DepositModal = ({ buyingPower, open, setOpen, refetch }: Props) => {
  const [deposit, { error }] = useMutation(DEPOSIT, {
    refetchQueries: [{ query: GET_MY_PORFOLIO }],
  })
  const [amount, setAmount] = useState("")
  const [disabled, setDisabled] = useState(true)

  const handleDeposit = (amount: number) => {
    return deposit({
      variables: {
        amount,
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
      await handleDeposit(value)
      toast.success("Desposit Successful")
      await refetch()
      toggle()
    } catch (e) {
      toast.error("Deposit Error: " + error?.message)
    }
  }

  const toggle = () => {
    setOpen((s: boolean) => !s)
  }

  return open ? (
    <Modal title='Deposit' toggle={toggle}>
      <div>
        <p>Available: {buyingPower}</p>
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
