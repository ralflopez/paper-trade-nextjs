import { gql } from "@apollo/client"

export const GET_MY_PORFOLIO = gql`
  query MyPortfolio {
    myPortfolio {
      buyingPower
      allocation {
        assetId
        symbol
        average
        total
      }
    }
  }
`
