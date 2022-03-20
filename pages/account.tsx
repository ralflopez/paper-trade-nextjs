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
import Image from "next/image"
import Link from "next/link"

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
        {portfolioData?.myPortfolio ? (
          <div className='text-5xl font-medium'>
            ${portfolioData.myPortfolio.buyingPower.toFixed(2)}
          </div>
        ) : null}
        <div className='mt-5'>
          <button
            className='p-5 py-2 text-white duration-300 ease-out rounded-sm bg-dark hover:bg-positive transition-color'
            onClick={toggleDepositModal}
          >
            Deposit
          </button>
          <button
            className='p-5 py-2 ml-2 text-white duration-300 ease-out bg-gray-400 rounded-sm hover:bg-negative'
            onClick={toggleWithdrawModal}
          >
            Withdraw
          </button>
        </div>
        <h3 className='mt-8 text-xl font-bold'>Assets</h3>
        {portfolioData?.myPortfolio
          ? portfolioData.myPortfolio.allocation.map((a) => (
              <Link href={`trades/${a.assetId}`} passHref key={a.assetId}>
                <div className='p-4 py-3 mt-4 transition-colors duration-300 ease-out bg-white rounded-sm shadow-sm hover:bg-gray-200'>
                  <div className='flex items-center'>
                    <Image
                      src={`https://assets.coincap.io/assets/icons/${a.symbol.toLowerCase()}@2x.png`}
                      alt={a.symbol}
                      width={45}
                      height={45}
                    />
                    <p className='ml-3'>
                      {a.assetId[0].toUpperCase() + a.assetId.substring(1)}
                      <span className='ml-2 text-gray-600'>({a.symbol})</span>
                    </p>
                  </div>
                  <p className='mt-2'>
                    Average Price:{" "}
                    <span className='font-bold'>{a.average.toFixed(2)}</span>
                  </p>
                  <p>
                    Total: <span className='font-bold'>{a.total}</span>
                  </p>
                </div>
              </Link>
            ))
          : null}
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
