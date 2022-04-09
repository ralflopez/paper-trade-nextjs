import Link from "next/link"
import React from "react"

interface Props {
  name: string
}

const Brand = ({ name }: Props) => {
  return (
    <h1 className='relative flex items-center justify-center font-bold'>
      <Link href='/' passHref>
        <a>{name}</a>
      </Link>
    </h1>
  )
}

export default Brand
