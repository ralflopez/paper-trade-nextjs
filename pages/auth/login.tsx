import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { FormEvent } from "react"
import { client } from "../../graphql"
import { LOGIN } from "../../graphql/query/auth"
import { NexusGenArgTypes, NexusGenObjects } from "../../types/nexus-typegen"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { setAccessToken } from "../../lib/auth/accessTokenCookie"
import {
  GetServerSidePropsContextExtended,
  withUser,
} from "../../lib/auth/withUser"

const Login = () => {
  const [login, { loading, error, data }] = useMutation<
    { login: NexusGenObjects["AuthPayload"] },
    NexusGenArgTypes["Mutation"]["login"]
  >(LOGIN)
  const router = useRouter()

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const {
      email: { value: email },
      password: { value: password },
    } = (e.target as any).elements

    try {
      await login({
        variables: {
          data: {
            email,
            password,
          },
        },
      })
    } catch (e) {
      console.error(e)
    }
  }

  if (loading) return <div>Login Loading...</div>
  if (data) {
    setAccessToken(data.login.token)
    client.resetStore()
    router.push("/")
  }

  return (
    <form onSubmit={handleLogin}>
      {error ? <div>{error.message}</div> : null}
      <input placeholder='Email' name='email' />
      <input placeholder='Password' name='password' type='password' />
      <button type='submit'>Log In</button>
    </form>
  )
}

export default Login

export const getServerSideProps: GetServerSideProps = withUser(
  async (context: GetServerSidePropsContextExtended) => {
    if (context.req.user) {
      return {
        props: {},
        redirect: {
          destination: "/",
        },
      }
    }

    return { props: {} }
  }
)
