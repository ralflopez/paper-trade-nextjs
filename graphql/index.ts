import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  fromPromise,
  DefaultOptions,
  Operation,
} from "@apollo/client"
import { REFRESH_TOKEN } from "./query/auth"
import { onError } from "apollo-link-error"
import {
  ACCESS_TOKEN_KEY,
  getServerAccessToken,
} from "../lib/auth/accessTokenCookie"
import cookie from "cookie"
import nookies from "nookies"

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
    const token = getServerAccessToken(operation.getContext())
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null,
      },
    }
  })
  return forward(operation)
})

const getNewToken = async (operation: Operation) => {
  console.log("GET NEW TOKEN LINK")
  const refreshToken = operation.getContext().req.cookies.refresh
  console.log("REFRESH TOKEN: " + refreshToken)
  operation.setContext({
    headers: {
      Cookie: cookie.serialize("refresh", refreshToken),
    },
  })

  const result = await client.query({
    query: REFRESH_TOKEN,
    context: operation.getContext(),
  })

  const accessToken = result.data.refreshToken.token
  console.log("GOT NEW ACCESS TOKEN: " + accessToken)
  return accessToken
}

const refreshTokenLink: any = onError(
  ({ graphQLErrors, operation, forward }): any => {
    console.log("REFRESH TOKEN LINK")
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        if (err.message === "jwt expired") {
          return fromPromise(
            //get new refresh token
            getNewToken(operation)
          )
            .filter((value) => Boolean(value))
            .flatMap((accessToken: string): any => {
              if (!accessToken) forward(operation)
              const oldHeaders = operation.getContext().headers

              nookies.set(
                operation.getContext(),
                ACCESS_TOKEN_KEY,
                accessToken,
                {
                  path: "/",
                }
              )

              // attach new token to the request
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
