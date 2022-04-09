import React from "react"

const Container = ({ children }: any) => {
  return (
    <div className='flex justify-between w-11/12 mx-0 md:justify-start md:w-10/12 max-w-7xl'>
      {children}
    </div>
  )
}

export default Container
