import React from "react"

interface Props {
  children: any
  className?: string
}

const Container = ({ children, className }: Props) => {
  return (
    <div className={`flex justify-center w-full pt-20 pb-8 ${className}`}>
      <div className='w-11/12 md:w-10/12 max-w-7xl'>{children}</div>
    </div>
  )
}

export default Container
