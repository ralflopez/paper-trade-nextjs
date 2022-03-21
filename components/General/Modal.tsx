import React, { useState } from "react"
import { X } from "react-bootstrap-icons"

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
        className='absolute top-0 left-0 z-40 w-full h-full bg-slate-800 opacity-40 backdrop-blur-3xl'
        onClick={handleToggle}
      ></div>
      <div className='absolute z-50 pb-4 -translate-x-1/2 bg-gray-200 rounded-md shadow-sm left-1/2 top-8'>
        <div className='flex items-center justify-between px-3 py-2 bg-white w-96'>
          <h5 className='font-bold'>{title ? title : " "}</h5>
          <div
            onClick={handleToggle}
            className='flex items-center transition-colors duration-300 ease-out rounded-full cursor-pointer hover:bg-gray-300'
          >
            <X width={30} height={30} />
          </div>
        </div>
        <div className='p-3'>{children}</div>
      </div>
    </>
  )
}

export default Modal
