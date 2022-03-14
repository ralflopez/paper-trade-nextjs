import { useLazyQuery } from "@apollo/client"
import { GetServerSideProps } from "next"
import React, { useEffect, useState } from "react"
import DepositModal from "../components/Account/DepositModal"
import WithdrawModal from "../components/Account/WithdrawModal"
import BuyModal from "../components/Trade/BuyModal"
import { GET_MY_PORFOLIO } from "../graphql/query/account/portfolio"
import usePortfolio from "../hooks/usePortfolio"
import { withAuthenticatedUser } from "../lib/auth/withAuthenticatedUser"
import { GetServerSidePropsContextExtended } from "../lib/auth/withUser"
import { NexusGenObjects } from "../types/nexus-typegen"

interface Props {
  user: NexusGenObjects["User"]
}

const Account = ({ user }: Props) => {
  const [showDepositModal, setDepositModal] = useState(false)
  const [showWithdrawModal, setWithdrawModal] = useState(false)
  const [showBuyModal, setBuyModal] = useState(false)
  const [showSellModal, setSellModal] = useState(false)
  const [currentAsset, setCurrentAsset] = useState<CoinCapIo_Asset>()
  const { portfolioData, portfolioQuery, portfolioError } = usePortfolio()

  const toggleDepositModal = () => {
    setDepositModal((s) => !s)
  }

  const toggleWithdrawModal = () => {
    setWithdrawModal((s) => !s)
  }

  return (
    <div>
      {portfolioData && (
        <>
          <DepositModal
            open={showDepositModal}
            setOpen={setDepositModal}
            refetch={portfolioQuery}
          />
          <WithdrawModal
            open={showWithdrawModal}
            setOpen={setWithdrawModal}
            refetch={portfolioQuery}
          />
          {currentAsset && (
            <BuyModal
              currentAsset={currentAsset}
              open={showBuyModal}
              setOpen={setBuyModal}
              refetch={portfolioQuery}
              myPortfolio={portfolioData.myPortfolio}
            />
          )}
        </>
      )}
      <div>
        <p>{user.email}</p>
        <p>{user.name}</p>
      </div>
      <div>
        <h3>Portfolio</h3>
        {portfolioError ? <div>{portfolioError.message}</div> : null}
        {portfolioData ? (
          <div>{portfolioData.myPortfolio.buyingPower}</div>
        ) : null}
        {portfolioData
          ? portfolioData.myPortfolio.allocation.map((a) => (
              <div key={a.assetId} className='mt-4 bg-red-300'>
                <p>Symbol: {a.symbol}</p>
                <p>Asset: {a.assetId}</p>
                <p>Average Price: {a.average.toFixed(2)}</p>
                <p>Total: {a.total}</p>
              </div>
            ))
          : null}
      </div>
      <div>
        <button onClick={toggleDepositModal}>Deposit</button>
        <button onClick={toggleWithdrawModal}>Withdraw</button>
      </div>
    </div>
  )
}

export default Account

export const getServerSideProps: GetServerSideProps = withAuthenticatedUser(
  async (context: GetServerSidePropsContextExtended) => {
    return {
      props: {
        user: context.req.user,
      },
    }
  }
)
