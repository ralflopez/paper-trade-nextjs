import Link from "next/link"
import { useRouter } from "next/router"
import React, { useState } from "react"
import Container from "../../components/General/Container"
import BuyModal from "../../components/Trade/BuyModal"
import SellModal from "../../components/Trade/SellModal"
import useLiveCoin from "../../hooks/trades/useLiveCoin"
import usePortfolio from "../../hooks/usePortfolio"
import Image from "next/image"

const Coin = () => {
  const router = useRouter()
  const assetId = router.query.assetId as string
  const [showBuyModal, setBuyModal] = useState(false)
  const [showSellModal, setSellModal] = useState(false)
  const { portfolioData } = usePortfolio()
  const { cryptos } = useLiveCoin(assetId)

  const toggleBuyModal = () => {
    if (!portfolioData) router.push("/auth/login")
    setBuyModal((s: boolean) => !s)
  }

  const toggleSellModal = () => {
    if (!portfolioData) router.push("/auth/login")
    setSellModal((s: boolean) => !s)
  }

  if (cryptos.length < 1) return <div></div>

  return (
    <Container>
      {cryptos[0] && portfolioData?.myPortfolio && (
        <>
          <BuyModal
            currentAsset={cryptos[0]}
            open={showBuyModal}
            setOpen={setBuyModal}
            myPortfolio={portfolioData.myPortfolio}
          />
          <SellModal
            currentAsset={cryptos[0]}
            open={showSellModal}
            setOpen={setSellModal}
            myPortfolio={portfolioData.myPortfolio}
          />
        </>
      )}
      <h2 className='text-gray-400 mb-7'>
        <span>Assets</span>
        <span className='ml-2 mr-2'>/</span>
        <span className='text-gray-500 '>
          <Link href='/trades'>Cryptocurrency</Link>
        </span>
        <span className='ml-2 mr-2'>/</span>
        <span className='font-bold text-gray-500 cursor-pointer'>
          {cryptos[0].name}
        </span>
      </h2>
      {cryptos.map((coin) => (
        <div key={coin.rank} className=''>
          <div className='flex items-center justify-between mb-9'>
            <div className='flex items-center'>
              <div className='flex items-center'>
                <Image
                  src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
                  alt={coin.symbol}
                  width={45}
                  height={45}
                />
              </div>
              <h3 className='ml-3 text-5xl font-bold'>{coin.name}</h3>
              <span className='self-end ml-3 text-2xl text-gray-500'>
                ({coin.symbol})
              </span>
            </div>

            <button className='hidden p-5 py-2 text-white rounded-sm bg-dark md:block'>
              <Link href='/account'>View Portfolio</Link>
            </button>
          </div>
          <div className='flex items-end mb-7'>
            <p className='text-3xl font-medium'>
              ${Number(coin.priceUsd).toFixed(5)}
            </p>
            <span className='ml-3'>
              {Number(coin.changePercent24Hr).toFixed(2)}%
            </span>
          </div>
          <div className='mb-9'>
            <button
              className='p-5 py-2 text-white duration-300 ease-out rounded-sm bg-dark hover:bg-positive transition-color'
              onClick={toggleBuyModal}
            >
              Buy
            </button>
            <button
              className='p-5 py-2 ml-2 text-white duration-300 ease-out bg-gray-400 rounded-sm hover:bg-negative'
              onClick={toggleSellModal}
            >
              Sell
            </button>
          </div>
          <div className='grid gap-4 md:grid-cols-3'>
            <div className='p-4 py-5 bg-white rounded-sm shadow-sm'>
              <p className='mb-2 text-lg font-bold'>Market Cap</p>
              <p className='flex items-center flex-grow '>
                ${Number(coin.marketCapUsd).toFixed(2)}
              </p>
            </div>
            <div className='p-4 py-5 bg-white rounded-sm shadow-sm'>
              <p className='mb-2 text-lg font-bold'>Volume</p>
              <p className='flex items-center flex-grow'>
                ${Number(coin.volumeUsd24Hr).toFixed(2)}
              </p>
            </div>
            <div className='p-4 py-5 bg-white rounded-sm shadow-sm'>
              <p className='mb-2 text-lg font-bold'>Supply</p>
              <p className='flex items-center flex-grow'>
                {Number(coin.supply).toFixed(2)} /{" "}
                {Number(coin.maxSupply).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </Container>
  )
}

export default Coin
