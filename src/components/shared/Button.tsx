import React from 'react'

type ButtonProps = {
  isMain: boolean
  text: string,
  onClick: () => void
  customStyles?: string
  isDisabled?: boolean
  disabledText?: string
}
const Button = ({ isMain, text, onClick, customStyles, isDisabled, disabledText }: ButtonProps) => {
  const commonStyles = 'border rounded-full py-3 px-4 text-sm'
  const commonDisablesStyles = `${commonStyles} border-gray-100 text-gray-400 bg-gray-100 cursor-not-allowed`

  const styles = isMain ?
    `${isDisabled ? commonDisablesStyles : `gradient-button text-white ${commonStyles}`} ${customStyles}`
    : `${isDisabled ? commonDisablesStyles : `bg-white border-light-blue button-text-gradient ${commonStyles}`} ${customStyles}`

  return (
    <button
      onClick={onClick}
      className={styles}
      disabled={isDisabled}
    >
      {isDisabled ? disabledText : text}
    </button>
  )
}

export default Button
