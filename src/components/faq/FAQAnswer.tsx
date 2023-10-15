import React, { useState } from 'react'

type FAQAnswerTypes = {
  question: string
  answer: string
  isInitiallyOpen?: boolean
}
const FAQAnswer = ({ question, answer, isInitiallyOpen = false }: FAQAnswerTypes) => {
  const [isOpen, setIsOpen] = useState(isInitiallyOpen)

  return (
    <div className='flex flex-col w-full mb-6'>
      <div className='flex flex-row w-full justify-between'>
        <div className='text-xl font-bold'>{question}</div>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className='cursor-pointer'
        >
          {isOpen ? 'Close' : 'Open'}
        </div>
      </div>
      {isOpen && <div className={'text-sm mt-2 text-light-gray'}>{answer}</div>}
    </div>
  )
}

export default FAQAnswer