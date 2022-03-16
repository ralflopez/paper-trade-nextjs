import Link from "next/link"
import React, { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { List } from "react-bootstrap-icons"

const Navbar = () => {
  const { pathname: currentPath, push } = useRouter()
  const [isNavOpen, setNavOpen] = useState(false)
  const routes = [
    { name: "Home", route: "/" },
    { name: "Trade", route: "/trades" },
    { name: "Account", route: "/account" },
  ]

  const toggleNavOpen = () => {
    setNavOpen((s) => !s)
  }

  const direct = (route: string) => {
    push(route)
    toggleNavOpen()
  }

  return (
    <>
      <div className='fixed top-0 left-0 z-20 flex justify-center w-full h-16 bg-white shadow-sm'>
        <div className='flex items-center justify-between w-11/12 h-full flex-coli md:flex-row md:w-10/12 max-w-7xl'>
          <div className='flex justify-between w-full'>
            <Link href='/' passHref>
              <Image
                src='/paper-trade-logo.svg'
                alt='Paper Trade'
                width={30}
                height={30}
              />
            </Link>
            <div
              className='grid p-1 transition-colors duration-300 ease-out bg-gray-200 rounded-full cursor-pointer md:hidden place-items-center hover:bg-gray-300'
              onClick={toggleNavOpen}
            >
              <List width={30} height={30} color='#090E2B' />
            </div>
          </div>
          <nav
            className={`absolute top-0 left-0 flex flex-col items-center justify-around w-full h-screen py-20 pt-16 text-xl bg-gray-100 md:bg-white md:text-sm md:pt-0 md:flex-row md:w-auto md:h-full md:py-0 md:static -z-10 md:z-0 md:flex transition-transform duration-300 ease-out md:translate-x-0 ${
              isNavOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {routes.map((r) => (
              <button onClick={() => direct(r.route)} key={r.name}>
                <li
                  className={`p-5 mb-3 text-center list-none transition-all duration-300 ease-out cursor-pointer md:mb-0 md:inline md:p-0 md:pl-3 hover:scale-105 ${
                    currentPath === r.route && "font-bold"
                  }`}
                >
                  {r.name}
                </li>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}

export default Navbar
