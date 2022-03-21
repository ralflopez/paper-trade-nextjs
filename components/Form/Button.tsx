import React from "react"

interface Props {
  disabled?: boolean
  isTypeSubmit?: boolean
  className?: string
  children: any
}

const Button = ({ disabled, isTypeSubmit, className, children }: Props) => {
  return (
    <button
      className={`p-3 mt-4 text-white transition-colors duration-300 rounded-md bg-dark hover:bg-primary ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
