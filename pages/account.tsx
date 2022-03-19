import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import React, { useState } from "react"
import DepositModal from "../components/Account/DepositModal"
import WithdrawModal from "../components/Account/WithdrawModal"
import Container from "../components/General/Container"
import usePortfolio from "../hooks/usePortfolio"
import { withAuthenticatedUser } from "../lib/auth/withAuthenticatedUser"
import { GetServerSidePropsContextExtended } from "../lib/auth/withUser"
import { NexusGenObjects } from "../types/nexus-typegen"

interface Props {
  user: NexusGenObjects["User"]
}

const Account = ({ user }: Props) => {
  const router = useRouter()
  const [showDepositModal, setDepositModal] = useState(false)
  const [showWithdrawModal, setWithdrawModal] = useState(false)
  const { portfolioData, portfolioQuery, portfolioError } = usePortfolio()

  const toggleDepositModal = () => {
    setDepositModal((s) => !s)
  }

  const toggleWithdrawModal = () => {
    setWithdrawModal((s) => !s)
  }

  return (
    <Container>
      <h2 className='mb-5 text-gray-400'>
        <span>Assets</span>
        <span className='ml-2 mr-2'>/</span>
        <span className='font-bold text-gray-500'>Portfolio</span>
      </h2>
      {portfolioData?.myPortfolio && (
        <>
          <DepositModal
            open={showDepositModal}
            setOpen={setDepositModal}
            refetch={portfolioQuery}
            buyingPower={portfolioData.myPortfolio.buyingPower}
          />
          <WithdrawModal
            open={showWithdrawModal}
            setOpen={setWithdrawModal}
            refetch={portfolioQuery}
            buyingPower={portfolioData.myPortfolio.buyingPower}
          />
        </>
      )}
      <div className='mb-4'>
        <p className='text-2xl font-bold'>Hi, {user.name}</p>
        <p>{user.email}</p>
      </div>
      <div>
        {portfolioError ? <div>{portfolioError.message}</div> : null}
        {portfolioData?.myPortfolio ? (
          <div className='text-3xl font-medium'>
            ${portfolioData.myPortfolio.buyingPower.toFixed(2)}
          </div>
        ) : null}
        {portfolioData?.myPortfolio
          ? portfolioData.myPortfolio.allocation.map((a) => (
              <div
                key={a.assetId}
                className='mt-4 bg-white p-4 py-3 rounded-sm shadow-sm hover:bg-gray-200 duration-300 ease-out transition-colors'
              >
                <p>Symbol: {a.symbol}</p>
                <p>Asset: {a.assetId}</p>
                <p>Average Price: {a.average.toFixed(2)}</p>
                <p>Total: {a.total}</p>
              </div>
            ))
          : null}
      </div>
      <div className=''>
        <button onClick={toggleDepositModal}>Deposit</button>
        <button onClick={toggleWithdrawModal}>Withdraw</button>
      </div>
    </Container>
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
