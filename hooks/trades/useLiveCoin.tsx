import { useCallback, useEffect, useState } from "react"

const useLiveCoin = (ids: string = "ALL") => {
  const [cryptos, setCryptos] = useState<CoinCapIo_Asset[]>([]) // data
  const [latestUpdate, setLatestUpdate] = useState<any>()

  // get initial data
  useEffect(() => {
    const getAssets = async () => {
      try {
        const result = await fetch(
          ids === "ALL"
            ? "https://api.coincap.io/v2/assets"
            : `https://api.coincap.io/v2/assets?ids=${ids}`
        )
        const { data }: { data: CoinCapIo_Asset[] } = await result.json()
        setCryptos(data)
      } catch (e) {
        setCryptos([])
      }
    }

    getAssets()
  }, [ids])

  // connect to ws
  useEffect(() => {
    const pricesWs = new WebSocket(`wss://ws.coincap.io/prices?assets=${ids}`)

    pricesWs.onmessage = (msg: any) => {
      setLatestUpdate(msg)
    }

    return () => {
      pricesWs.close()
    }
  }, [ids])

  // modify state
  useEffect(() => {
    if (!latestUpdate?.data) return
    const data = JSON.parse(latestUpdate.data)

    Object.keys(data).forEach((key: string) => {
      const newPrice = data[key]
      setCryptos((cryptos) => {
        const newCryptos = cryptos.map((crypto) => {
          if (crypto.id === key) {
            return { ...crypto, priceUsd: newPrice }
          } else {
            return { ...crypto }
          }
        })

        return newCryptos
      })
    })
  }, [latestUpdate])

  return { cryptos }
}

export default useLiveCoin
