import Link from "next/link"
import { useRouter } from "next/router"
import React, { useState } from "react"
import Container from "../Container"
import PopupContainer from "./PopupContainer"

interface Props {
  show: boolean
  toggleShow: Function
  isMd: boolean
}

const Links = ({ show, toggleShow, isMd }: Props) => {
  const routes = [
    { name: "New", route: "/collection/new" },
    { name: "Men", route: "/collection/men" },
    { name: "Women", route: "/collection/women" },
    { name: "Accessories", route: "/collection/accessories" },
  ]

  return (
    <PopupContainer isMd={isMd} show={show} toggleShow={toggleShow}>
      <nav className=''>
        <ul className='inline'>
          {routes.map((route) => (
            <li
              className='flex py-1 transition-colors duration-300 ease-out hover:bg-gray-300 md:m-3 md:inline'
              key={route.name}
            >
              <Link href={route.route} passHref>
                <a className='w-full px-3 py-2'>{route.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </PopupContainer>
  )
}

export default Links
