import { useQuery } from "@apollo/client"
import { GetServerSideProps } from "next"
import React, { useState } from "react"
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
  const {
    loading: portfolioLoading,
    error: portfolioError,
    data: portfolioData,
  } = useQuery<{ myPortfolio: NexusGenObjects["PortfolioOutput"] }>(
    GET_MY_PORFOLIO
  )

  const toggleDepositModal = () => {
    setDepositModal((s) => !s)
  }

  return (
    <div>
      <ToastContainer hideProgressBar={true} />
      <DepositModal open={showDepositModal} setOpen={setDepositModal} />
      <div>
        <p>{user.email}</p>
        <p>{user.name}</p>
      </div>
      <div>
        <h3>Portfolio</h3>
        {portfolioError ? <div>{portfolioError.message}</div> : null}
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
