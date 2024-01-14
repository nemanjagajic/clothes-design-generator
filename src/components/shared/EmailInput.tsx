import React, { ChangeEvent, SetStateAction, Dispatch } from 'react'

const EmailInput = ({
  customStyle = '',
  email,
  setEmail,
  isValid,
  setIsValid,
}: {
  customStyle?: string
  email: string
  setEmail: Dispatch<SetStateAction<string>>
  isValid: boolean
  setIsValid: Dispatch<SetStateAction<boolean>>
}) => {
  // Simple regex for email validation
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

  const validateEmail = (value: string) => {
    setIsValid(emailRegex.test(value))
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setEmail(value)
    validateEmail(value)
  }

  return (
    <div className={customStyle}>
      <input
        type="email" // Changed to type 'email' to use browser's email validation as well
        value={email}
        name="email"
        onChange={handleChange}
        onBlur={() => validateEmail(email)}
        className="p-2 m-2 border border-gray-300 rounded w-full"
        placeholder="Email"
      />
      {!isValid && (
        <div style={{ color: 'red' }}>E-mail nije dobro formatiran</div>
      )}
    </div>
  )
}

export default EmailInput
