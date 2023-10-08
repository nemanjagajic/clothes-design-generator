import React from 'react'

type ButtonProps = {
  isMain: boolean
  text: string,
  onClick: () => void
  customStyles?: string
}
const Button = ({ isMain, text, onClick, customStyles }: ButtonProps) => {
  const commonStyles = 'border border-light-blue rounded-full py-3 px-4 text-sm'

  const styles = isMain ?
    `gradient-button text-white ${commonStyles} ${customStyles}`
    : `bg-white button-text-gradient ${commonStyles} ${customStyles}`

  return (
    <button
      onClick={onClick}
      className={styles}
    >
      {text}
    </button>
  )
}

export default Button
