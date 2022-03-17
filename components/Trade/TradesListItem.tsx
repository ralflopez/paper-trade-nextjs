import Link from "next/link"
import React, { memo } from "react"
import Image from "next/image"

interface Props {
  coin: CoinCapIo_Asset
  key: string
}

const getPercentChangeColor = (changePercent24Hr: string) => {
  return changePercent24Hr[0] === "-" ? "text-negative" : "text-positive"
}

const getPercentChange = (oldValue: number, newValue: number) => {
  const increase = newValue - oldValue

  const percentIncrease = (increase / oldValue) * 100

  return percentIncrease
}

const areEqual = (prevProps: Readonly<Props>, nextProps: Readonly<Props>) => {
  const prevPrice = prevProps.coin.priceUsd
  const nextPrice = nextProps.coin.priceUsd
  const result = prevPrice === nextPrice

  return result
}

const TradesListItem = memo(({ coin }: Props) => {
  return (
    <Link href={`trades/${coin.id}`} passHref={true}>
      <div className='p-3 py-4 mb-2 transition-colors duration-300 ease-out bg-white rounded-md shadow-sm cursor-pointer hover:bg-gray-200'>
        <div className='flex items-center justify-between'>
          <p className='w-1/7 '>{coin.rank}</p>
          <div className='grid w-1/5 place-items-center '>
            <Image
              src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
              alt={coin.symbol}
              width={30}
              height={30}
            />
          </div>
          <p className='w-2/5 pl-2 '>{coin.name}</p>
          <p className='w-1/5 '>
            {/* {currency.symbol} */}${Number(coin.priceUsd).toFixed(5)}
          </p>
          <p
            className={`${getPercentChangeColor(coin.changePercent24Hr)} w-1/5`}
          >
            {getPercentChange(
              Number(coin.vwap24Hr),
              Number(coin.priceUsd)
            ).toFixed(2)}
            {/* {coin.vwap24Hr} */}
          </p>
        </div>
      </div>
    </Link>
  )
}, areEqual)

TradesListItem.displayName = "TradesLisItem"

export default TradesListItem
