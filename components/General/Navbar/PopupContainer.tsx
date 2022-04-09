import React from "react"

interface Props {
  show: boolean
  toggleShow: Function
  isMd: boolean
  children: any
}

const PopupContainer = ({ isMd, show, toggleShow, children }: Props) => {
  return (
    <>
      <div
        className={`absolute top-0 left-0 w-full h-screen bg-black opacity-10 ${
          show && !isMd ? "flex" : "hidden"
        }`}
        onClick={toggleShow as React.MouseEventHandler<HTMLDivElement>}
      ></div>
      <div className='absolute left-0 flex justify-center flex-grow invisible w-screen pt-20 pb-8 md:static md:w-auto md:p-0'>
        <div
          className={`absolute items-center justify-center flex-grow md:static top-24 right-5 ${
            show && !isMd ? "flex" : "hidden"
          } md:flex border-1 shadow-none border-black md:border-0 bg-white transition-all duration-300 ease-out visible`}
        >
          {children}
        </div>
      </div>
    </>
  )
}

export default PopupContainer
