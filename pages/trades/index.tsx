import React from "react"
import useLiveCoin from "../../hooks/trades/useLiveCoin"

const Trades = () => {
  const { cryptosList } = useLiveCoin()
  return (
    <div>
      {cryptosList.map((c) => (
        <div key={c.rank}>
          <p>{c.id}</p>
          <p>{c.rank}</p>
          <p>{c.name}</p>
          <p>{c.priceUsd}</p>
          <p>{c.changePercent24Hr}</p>
        </div>
      ))}
    </div>
  )
}

export default Trades
