import React, { useState } from "react"

interface Props {
  title: string
  toggle: Function
  children?: any
}

const Modal = ({ title, toggle, children }: Props) => {
  const handleToggle = () => {
    toggle()
  }

  return (
    <>
      <div
        className='absolute top-0 left-0 z-10 w-full h-full bg-slate-800 opacity-40'
        onClick={handleToggle}
      ></div>
      <div className='absolute z-20 -translate-x-1/2 bg-red-700 left-1/2 top-5'>
        <div className='flex justify-between px-3 py-2 w-96'>
          <h5>{title ? title : " "}</h5>
          <div onClick={handleToggle}>Close</div>
        </div>
        <div className='p-3'>{children}</div>
      </div>
    </>
  )
}

export default Modal
