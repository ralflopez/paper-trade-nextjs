import { GetServerSidePropsContext } from "next/types"
import { client } from "../../graphql"
import { GET_MY_USER } from "../../graphql/query/auth"
import { GetServerSidePropsContextExtended } from "./withUser"

export const withAuthenticatedUser = (callback: Function) => {
  return async (context: GetServerSidePropsContext) => {
    const extendedContext: GetServerSidePropsContextExtended = {
      ...context,
    } as any

    try {
      const { data } = await client.query({
        query: GET_MY_USER,
        context,
        fetchPolicy: "network-only",
      })
      extendedContext.req.user = data.getMyUser
      return callback(context)
    } catch (e) {
      extendedContext.req.user = null
      return {
        props: {},
        redirect: {
          destination: "/auth/login",
        },
      }
    }
  }
}
