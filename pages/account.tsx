import { useLazyQuery } from "@apollo/client"
import { GetServerSideProps } from "next"
import React, { useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import DepositModal from "../components/Account/DepositModal"
import { GET_MY_PORFOLIO } from "../graphql/query/account/portfolio"
import { withAuthenticatedUser } from "../lib/auth/withAuthenticatedUser"
import { GetServerSidePropsContextExtended } from "../lib/auth/withUser"
import { NexusGenObjects } from "../types/nexus-typegen"

interface Props {
  user: NexusGenObjects["User"]
}

const Account = ({ user }: Props) => {
  const [showDepositModal, setDepositModal] = useState(false)
  const [portfolioQuery, { error: portfolioError, data: portfolioData }] =
    useLazyQuery<{ myPortfolio: NexusGenObjects["PortfolioOutput"] }>(
      GET_MY_PORFOLIO
    )

  useEffect(() => {
    portfolioQuery()
  }, [portfolioQuery])

  const toggleDepositModal = () => {
    setDepositModal((s) => !s)
  }

  return (
    <div>
      <ToastContainer hideProgressBar={true} />
      <DepositModal
        open={showDepositModal}
        setOpen={setDepositModal}
        refetch={portfolioQuery}
      />
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
              <div key={a.assetId}>
                <p>{a.symbol}</p>
                <p>{a.assetId}</p>
                <p>{a.average}</p>
                <p>{a.total}</p>
              </div>
            ))
          : null}
      </div>
      <div>
        <button onClick={toggleDepositModal}>Deposit</button>
        <button>Withdraw</button>
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
