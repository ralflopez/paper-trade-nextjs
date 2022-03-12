import { GetServerSidePropsContext } from "next"
import { client } from "../../graphql/index"
import { GET_MY_USER } from "../../graphql/query/auth"
import { NexusGenObjects } from "../../types/nexus-typegen"

export type GetServerSidePropsContextExtended = GetServerSidePropsContext & {
  req: {
    user: NexusGenObjects["User"] | null
  }
}

export const withUser = (callback: Function) => {
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
      return callback(context)
    }
  }
}
