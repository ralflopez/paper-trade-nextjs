import { useQuery } from "@apollo/client"
import React from "react"
import { TRANSACTIONS } from "../graphql/query/account/transaction"
import { NexusGenObjects } from "../types/nexus-typegen"

const Transactions = () => {
  const { data, loading, error } =
    useQuery<{ transactions: NexusGenObjects["Transaction"][] }>(TRANSACTIONS)

  if (loading) return <div>Loading..</div>
  if (error) return <div className='bg-red-500'>{error.message}</div>

  return (
    <div>
      <h2>Transactions</h2>
      <div>
        {data &&
          data.transactions.map((transaction) => {
            return (
              <div key={transaction.id} className='p-5 bg-red-300'>
                <p>Amount: {Math.abs(transaction.amount).toFixed(7)}</p>
                <p>Type: {transaction.type}</p>
                <p>Value USD: {transaction.valueUsd.toFixed(7)}</p>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Transactions
