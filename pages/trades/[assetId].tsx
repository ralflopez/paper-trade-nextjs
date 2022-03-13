import { useRouter } from "next/router"
import React, { useState } from "react"
import BuyModal from "../../components/Trade/BuyModal"
import useLiveCoin from "../../hooks/trades/useLiveCoin"

const Coin = () => {
  const router = useRouter()
  const assetId = router.query.assetId as string
  const [showBuyModal, setBuyModal] = useState(false)

  const { cryptosList } = useLiveCoin(assetId)

  const toggleBuyModal = () => {
    setBuyModal((s: boolean) => !s)
  }

  return (
    <div>
      {cryptosList[0] && (
        <BuyModal
          assetId={assetId}
          currentPrice={cryptosList[0].priceUsd}
          open={showBuyModal}
          setOpen={setBuyModal}
        />
      )}
      {cryptosList.map((c) => (
        <div key={c.rank}>
          <p>{c.id}</p>
          <p>{c.rank}</p>
          <p>{c.name}</p>
          <p>{c.priceUsd}</p>
          <p>{c.changePercent24Hr}</p>
          <button onClick={toggleBuyModal}>Buy</button>
        </div>
      ))}
    </div>
  )
}

export default Coin
