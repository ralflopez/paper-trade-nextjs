import React from "react"

const Input = ({
  name,
  placeholder,
  className,
  type = "text",
  value,
  onChange,
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) => {
  return (
    <input
      placeholder={placeholder}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className={`p-3 mb-4 bg-gray-200 rounded-md outline-none focus:border-2 border-primary ${className}`}
    />
  )
}

export default Input
