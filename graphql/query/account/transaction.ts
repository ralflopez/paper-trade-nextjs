import { gql } from "@apollo/client"

export const TRANSACTIONS = gql`
  query Transactions {
    transactions {
      id
      amount
      assetId
      assetType
      symbol
      timestamp
      type
      valueUsd
    }
  }
`

export const BUY = gql`
  mutation Buy($amount: Float!, $assetId: String!) {
    buy(amount: $amount, assetId: $assetId) {
      amount
      assetId
      symbol
      valueUsd
    }
  }
`

export const SELL = gql`
  mutation Sell($amount: Float!, $assetId: String!) {
    sell(amount: $amount, assetId: $assetId) {
      amount
      assetId
      symbol
      valueUsd
    }
  }
`
