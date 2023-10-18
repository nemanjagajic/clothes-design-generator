import React, { useState } from 'react'
import { ChevronDownOutline, ChevronUpOutline } from 'react-ionicons'

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
          {isOpen ? (
            <ChevronUpOutline
              height="25px"
              width="25px"
            />
          ) : (
            <ChevronDownOutline
              height="25px"
              width="25px"
            />
          )}
        </div>
      </div>
      {isOpen && <div className={'text-sm mt-2 text-light-gray'}>{answer}</div>}
    </div>
  )
}

export default FAQAnswer