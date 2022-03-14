import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  fromPromise,
  DefaultOptions,
} from "@apollo/client"
import { REFRESH_TOKEN } from "./query/auth"
import { onError } from "apollo-link-error"
import { getAccessToken, setAccessToken } from "../lib/auth/accessTokenCookie"

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    // errorPolicy: "all",
  },
  query: {
    fetchPolicy: "no-cache",
    // errorPolicy: "all",
  },
}

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
})

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const token = getAccessToken(operation.getContext())

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null,
      },
    }
  })

  return forward(operation)
})

const getNewToken = async () => {
  const result = await client.query({ query: REFRESH_TOKEN })
  setAccessToken(result.data.refreshToken.token)
  return result.data.refreshToken.token
}

const refreshTokenLink: any = onError(
  ({ graphQLErrors, operation, forward }): any => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        if (err.message === "jwt expired") {
          return fromPromise(
            getNewToken().catch((error) => {
              return error
            })
          )
            .filter((value) => Boolean(value))
            .flatMap((accessToken: string): any => {
              const oldHeaders = operation.getContext().headers

              operation.setContext({
                headers: {
                  ...oldHeaders,
                  authorization: `Bearer ${accessToken}`,
                },
              })

              return forward(operation)
            })
        }
      }
    }
  }
)

export const client = new ApolloClient({
  link: ApolloLink.from([authMiddleware, refreshTokenLink.concat(httpLink)]),
  cache: new InMemoryCache(),
  defaultOptions,
})
