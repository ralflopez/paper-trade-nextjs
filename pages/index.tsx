import type { GetServerSideProps } from "next"
import LogoutButton from "../components/Auth/LogoutButton"
import {
  GetServerSidePropsContextExtended,
  withUser,
} from "../lib/auth/withUser"
import { NexusGenObjects } from "../types/nexus-typegen"

interface Props {
  user: NexusGenObjects["User"] | null
}

const Home = ({ user }: Props) => {
  return (
    <div className='bg-fuchsia-500'>
      Hello {user ? user.name : ""}
      <LogoutButton />
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = withUser(
  async (context: GetServerSidePropsContextExtended) => {
    return {
      props: {
        user: context.req.user,
      },
    }
  }
)
