import React from 'react'

type ButtonProps = {
  isMain?: boolean
  text: string
  onClick: () => void
  customStyles?: string
  isDisabled?: boolean
  disabledText?: string
  customDisabledStyles?: string
}
const Button = ({
  isMain,
  text,
  onClick,
  customStyles = '',
  isDisabled,
  disabledText,
}: ButtonProps) => {
  return (
    <button
      className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-md hover:from-blue-600 hover:to-blue-800 py-3 px-12 mb-10"
      onClick={onClick}
    >
      { text }
    </button>
  )
}

export default Button
