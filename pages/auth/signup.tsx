import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { FormEvent, useState } from "react"
import { SIGNUP } from "../../graphql/query/auth"
import { NexusGenArgTypes, NexusGenObjects } from "../../types/nexus-typegen"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { setAccessToken } from "../../lib/auth/accessTokenCookie"
import {
  GetServerSidePropsContextExtended,
  withUser,
} from "../../lib/auth/withUser"
import { client } from "../../graphql"

const Signup = () => {
  const [signup, { loading, error, data }] = useMutation<
    { signup: NexusGenObjects["AuthPayload"] },
    NexusGenArgTypes["Mutation"]["signup"]
  >(SIGNUP)
  const router = useRouter()

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    const {
      name: { value: name },
      email: { value: email },
      password: { value: password },
    } = (e.target as any).elements

    try {
      await signup({
        variables: {
          data: {
            name,
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
    setAccessToken(data.signup.token)
    client.resetStore()
    router.push("/")
  }

  return (
    <form onSubmit={handleLogin}>
      {error ? <div className='bg-red-400'>{error.message}</div> : null}
      <input placeholder='Name' name='name' />
      <input placeholder='Email' name='email' />
      <input placeholder='Password' name='password' type='password' />
      <button type='submit'>Sign up</button>
    </form>
  )
}

export default Signup

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
