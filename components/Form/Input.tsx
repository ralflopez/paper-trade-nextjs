import React from "react"

interface Props {
  placeholder: string
  name: string
  className?: string
  type?: string
}

const Input = ({ name, placeholder, className, type = "text" }: Props) => {
  return (
    <input
      placeholder={placeholder}
      name={name}
      type={type}
      className={`p-3 mb-4 bg-gray-200 rounded-md outline-none focus:border-2 border-primary ${className}`}
    />
  )
}

export default Input
