import { gql } from "@apollo/client"

export const DEPOSIT = gql`
  mutation Deposit($amount: Float!) {
    deposit(amount: $amount) {
      amount
    }
  }
`
export const WITHDRAW = gql`
  mutation Withdraw($amount: Float!) {
    withdraw(amount: $amount) {
      amount
    }
  }
`
