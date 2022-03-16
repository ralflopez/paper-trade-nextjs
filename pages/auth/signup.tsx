import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { FormEvent } from "react"
import { SIGNUP } from "../../graphql/query/auth"
import { NexusGenArgTypes, NexusGenObjects } from "../../types/nexus-typegen"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { setAccessToken } from "../../lib/auth/accessTokenCookie"
import {
  GetServerSidePropsContextExtended,
  withUser,
} from "../../lib/auth/withUser"
import { client } from "../../graphql"
import Container from "../../components/General/Container"

const Signup = () => {
  const [signup, { loading, error, data }] = useMutation<
    { signup: NexusGenObjects["AuthPayload"] },
    NexusGenArgTypes["Mutation"]["signup"]
  >(SIGNUP)
  const router = useRouter()

  const handleSignup = async (e: FormEvent) => {
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

  // return (
  //   <form onSubmit={handleLogin}>
  //     {error ? <div className='bg-red-400'>{error.message}</div> : null}
  //     <input placeholder='Name' name='name' />
  //     <input placeholder='Email' name='email' />
  //     <input placeholder='Password' name='password' type='password' />
  //     <button type='submit'>Sign up</button>
  //   </form>
  // )
  return (
    <Container>
      <div className='flex justify-center'>
        <form
          onSubmit={handleSignup}
          className='flex flex-col w-full p-5 rounded-md md:w-96'
        >
          <h2 className='text-3xl font-bold text-center mb-7'>Sign up</h2>
          {error && (
            <div className='p-3 py-4 mb-4 text-white rounded-md bg-negative'>
              {error.message}
            </div>
          )}
          <input
            placeholder='Name'
            name='name'
            className='p-3 mb-4 bg-gray-200 rounded-md outline-none focus:border-2 border-primary'
          />
          <input
            placeholder='Email'
            name='email'
            className='p-3 mb-4 bg-gray-200 rounded-md outline-none focus:border-2 border-primary'
          />
          <input
            placeholder='Password'
            name='password'
            type='password'
            className='p-3 mb-4 bg-gray-200 rounded-md outline-none'
          />
          <button
            type='submit'
            className='p-3 mt-4 text-white transition-colors duration-300 rounded-md bg-dark hover:bg-primary'
          >
            Sign up
          </button>
        </form>
      </div>
    </Container>
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
