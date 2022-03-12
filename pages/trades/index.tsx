import React, { useEffect, useReducer, useState } from "react"

interface CryptoHash {
  [name: string]: CoinCapIo_Asset
}

const flattenCryptoHash = (item: CryptoHash) => {
  const result: CoinCapIo_Asset[] = []
  const keys = Object.keys(item)

  // add all hash map to array
  keys.forEach((key: string) => {
    // format price
    const price = Number(item[key].priceUsd)
    const formatedPrice = Math.round(price * 100) / 100
    item[key].priceUsd = formatedPrice.toFixed(2)

    // format 24 hr change
    item[key].changePercent24Hr = Number(item[key].changePercent24Hr).toFixed(2)
    // push to array
    result.push(item[key])
  })

  // sort
  result.sort((a, b) => parseInt(a.rank) - parseInt(b.rank))

  return result
}

const Trades = () => {
  const [cryptos, setCryptos] = useState<CryptoHash>({}) // data
  const [cryptosList, setCryptosList] = useState<CoinCapIo_Asset[]>([]) // display

  const getAssets = async () => {
    const result = await fetch("https://api.coincap.io/v2/assets")
    const { data }: { data: CoinCapIo_Asset[] } = await result.json()

    // store
    const format: CryptoHash = {}
    data.forEach((d: CoinCapIo_Asset) => {
      format[d.id] = d
    })
    setCryptos(format)
  }

  // get initial data
  useEffect(() => {
    getAssets()
  }, [])

  // format data for display
  useEffect(() => {
    const list = flattenCryptoHash(cryptos)
    setCryptosList(list)
  }, [cryptos])

  // connect to ws
  useEffect(() => {
    const pricesWs = new WebSocket("wss://ws.coincap.io/prices?assets=ALL")

    pricesWs.onmessage = function (msg) {
      const data: { [name: string]: string } = JSON.parse(msg.data)

      Object.keys(data).forEach((key: string) => {
        const newPrice = data[key]

        setCryptos((crypto) => {
          if (!crypto[key]) return crypto
          const newCrypto = { ...crypto }
          newCrypto[key].priceUsd = newPrice
          return newCrypto
        })
      })
    }
  }, [])

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
