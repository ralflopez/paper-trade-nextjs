import { useLazyQuery } from "@apollo/client"
import { useEffect } from "react"
import { GET_MY_PORFOLIO } from "../graphql/query/account/portfolio"
import { NexusGenObjects } from "../types/nexus-typegen"

const usePortfolio = () => {
  const [
    portfolioQuery,
    { loading: portfolioLoading, error: portfolioError, data: portfolioData },
  ] =
    useLazyQuery<{ myPortfolio: NexusGenObjects["PortfolioOutput"] }>(
      GET_MY_PORFOLIO
    )

  useEffect(() => {
    portfolioQuery()
  }, [portfolioQuery])

  return { portfolioQuery, portfolioData, portfolioError, portfolioLoading }
}

export default usePortfolio
