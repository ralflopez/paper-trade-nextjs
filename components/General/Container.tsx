import React from "react"

const Container = ({ children }: any) => {
  return (
    <div className='flex justify-center w-full pt-20 pb-8'>
      <div className='w-11/12 md:w-10/12 max-w-7xl'>{children}</div>
    </div>
  )
}

export default Container
