import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { FormEvent } from "react"
import { client } from "../../graphql"
import { LOGIN } from "../../graphql/query/auth"
import { NexusGenArgTypes, NexusGenObjects } from "../../types/nexus-typegen"
import { GetServerSideProps } from "next"
import { setClientAccessToken } from "../../lib/auth/accessTokenCookie"
import {
  GetServerSidePropsContextExtended,
  withUser,
} from "../../lib/auth/withUser"
import Container from "../../components/General/Container"

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

    ;(e.target as any).reset()

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

  if (data) {
    setClientAccessToken(data.login.token)
    client.resetStore()
    router.push("/")
  }

  return (
    <Container>
      <div className='flex justify-center'>
        <form
          onSubmit={handleLogin}
          className='flex flex-col w-full p-5 rounded-md md:w-96'
        >
          <h2 className='text-3xl font-bold text-center mb-7'>Log in</h2>
          {error && (
            <div className='p-3 py-4 mb-4 text-white rounded-md bg-negative'>
              {error.message}
            </div>
          )}
          <input
            placeholder='Email'
            name='email'
            className='p-3 mb-4 bg-gray-200 rounded-sm outline-none focus:border-2 border-primary'
          />
          <input
            placeholder='Password'
            name='password'
            type='password'
            className='p-3 mb-4 bg-gray-200 rounded-sm outline-none focus:border-2 border-primary'
          />
          <button
            disabled={loading ? true : false}
            type='submit'
            className='p-3 mt-4 text-white transition-colors duration-300 rounded-sm bg-dark hover:bg-primary'
          >
            {loading ? "Loading..." : "Log in"}
          </button>
        </form>
      </div>
    </Container>
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
