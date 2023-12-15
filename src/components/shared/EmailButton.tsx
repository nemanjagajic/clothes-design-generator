import React from 'react'

interface ButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

const EmailButton: React.FC<ButtonProps> = ({ label, onClick, disabled }) => {
  return (
    <div className='mt-2 flex justify-center items-center'>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`px-4 py-2 border rounded-md text-sm font-medium shadow-sm transition-colors
                  ${
                    disabled
                      ? 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed'
                      : 'bg-blue-600 text-white border-blue-200 hover:bg-blue-500'
                  }`}
      >
        {label}
      </button>
    </div>
  )
}

export default EmailButton
