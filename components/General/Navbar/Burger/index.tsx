import { useRouter } from "next/router"
import React from "react"
import { Cart, ThreeDotsVertical } from "react-bootstrap-icons"

interface Props {
  toggleMenu: Function
  toggleCart: Function
  isMd: boolean
}

const Burger = ({ toggleMenu, toggleCart, isMd }: Props) => {
  const router = useRouter()

  return (
    <div className='relative flex items-center justify-center'>
      <div className='w-14'></div>
      <button
        className='absolute flex items-center justify-center transition-colors duration-300 ease-out bg-black rounded-full hover:bg-gray-600 w-14 h-14 top-8'
        onClick={isMd ? () => router.push("/cart") : (toggleMenu as any)}
      >
        <Cart className='hidden md:block' color='white' />
        <ThreeDotsVertical className='md:hidden' color='white' />
      </button>
    </div>
  )
}

export default Burger
