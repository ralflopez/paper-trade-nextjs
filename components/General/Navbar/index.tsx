import React, { useEffect, useState } from "react"
import NavContainer from "./NavContainer"
import Brand from "./Brand"
import Burger from "./Burger"
import Links from "./Links"
import useMediaQuery from "../../../hooks/useMediaQuery"

const Navbar = () => {
  const isMd = useMediaQuery("md")
  const [showMenu, setMenu] = useState(false)
  const [showCart, setCart] = useState(false)

  useEffect(() => {
    if (isMd) setMenu(false)
  }, [isMd])

  const toggleMenu = () => {
    setCart(false)
    setMenu((m) => !m)
  }

  const toggleCart = () => {
    setMenu(false)
    setCart((c) => !c)
  }

  return (
    <>
      <div className='fixed top-0 left-0 z-20 flex justify-center w-full h-16 bg-white border-black shadow-none border-b-1'>
        <NavContainer>
          <Brand name='Popshop' />
          <Links show={showMenu} toggleShow={toggleMenu} isMd={isMd} />
          <Burger toggleMenu={toggleMenu} toggleCart={toggleCart} isMd={isMd} />
        </NavContainer>
      </div>
    </>
  )
}

export default Navbar
