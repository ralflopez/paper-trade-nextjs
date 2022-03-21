import type { GetServerSideProps } from "next"
import LogoutButton from "../components/Auth/LogoutButton"
import {
  GetServerSidePropsContextExtended,
  withUser,
} from "../lib/auth/withUser"
import { NexusGenObjects } from "../types/nexus-typegen"
import "react-toastify/dist/ReactToastify.css"
import Image from "next/image"
import { useEffect, useState } from "react"
import Link from "next/link"

interface Props {
  user: NexusGenObjects["User"] | null
}

const Home = ({ user }: Props) => {
  const [illustration, setIllustration] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    function parallaxIllustration(e: any) {
      const x = (window.innerWidth - e.clientX * 1) / 100
      const y = (window.innerHeight - e.clientY * 1) / 100
      setIllustration({ x, y })
    }

    document.addEventListener("mousemove", parallaxIllustration)
    return () => document.removeEventListener("mousemove", parallaxIllustration)
  }, [])

  return (
    <>
      <div className='flex justify-center overflow-hidden'>
        <div className='absolute w-screen h-screen home-background -z-20'></div>
        <div className='grid w-10/12 h-screen grid-cols-1 md:grid-cols-2'>
          <div className='flex items-center'>
            <div className='w-full text-center md:text-left '>
              <div className='md:hidden'>
                <Image src='/hero.svg' alt='Hero' height={200} width={200} />
              </div>
              <h1 className='mb-4 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl'>
                Paper Trade
              </h1>
              <p className='text-xl mb-7'>
                Practice trading without loosing money
              </p>
              <button className='px-6 py-4 text-white transition-all duration-300 ease-out rounded-md bg-dark hover:bg-gray-800 hover:scale-105'>
                <Link href='/trades' passHref>
                  <a>Start Now</a>
                </Link>
              </button>
            </div>
          </div>
          <div className='relative justify-end hidden md:flex'>
            <div
              className='relative w-full max-w-md'
              style={{
                transform: `translateX(${illustration.x}px) translateY(${illustration.y}px)`,
              }}
            >
              <Image src='/hero.svg' alt='Hero' layout='fill' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = withUser(
  async (context: GetServerSidePropsContextExtended) => {
    // console.log(context.req.cookies)
    return {
      props: {
        user: context.req.user,
      },
    }
  }
)
