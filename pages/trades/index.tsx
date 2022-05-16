import React, { useEffect, useState } from "react"
import Container from "../../components/General/Container"
import TradesListItem from "../../components/Trade/TradesListItem"
import useLiveCoin from "../../hooks/trades/useLiveCoin"

const Trades = () => {
  const { cryptos } = useLiveCoin() // actual data

  // console.log(cryptos)

  return (
    <Container>
      <h2 className='mb-5 text-gray-400'>
        <span>Assets</span>
        <span className='ml-2 mr-2'>/</span>
        <span className='font-bold text-gray-500'>Cryptocurrency</span>
      </h2>
      {cryptos.map((c) => (
        <TradesListItem coin={c} key={c.id} />
      ))}
      {/* <div>{cryptos[0]?.priceUsd}</div> */}
    </Container>
  )
}

export default Trades
