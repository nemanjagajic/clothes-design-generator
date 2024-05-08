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
      disabled={isDisabled}
      className={`
        ${!isDisabled && 'bg-gradient-to-r'} 
        from-light-blue
        to-nsm-blue-100
        text-white
        rounded-full
        shadow-md
        hover:from-blue-600
        hover:to-blue-800
        py-3
        px-12
        ${customStyles}`}
      onClick={onClick}
    >
      {isDisabled ? disabledText : text}
    </button>
  )
}

export default Button
