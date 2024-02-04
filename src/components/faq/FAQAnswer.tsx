import React, { useState } from 'react'
import { ChevronDownOutline, ChevronUpOutline } from 'react-ionicons'

type FAQAnswerTypes = {
  question: string
  answer: string
  isInitiallyOpen?: boolean
}
const FAQAnswer = ({
  question,
  answer,
  isInitiallyOpen = false,
}: FAQAnswerTypes) => {
  const [isOpen, setIsOpen] = useState(isInitiallyOpen)

  return (
    <div
      className="flex flex-col w-full mb-6 bg-nsm-gray-300 p-4 rounded-md relative cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      {!isOpen && (
        <div className="absolute inset-0 bg-nsm-gray-300 bg-opacity-60" />
      )}
      <div className="flex flex-row w-full justify-between">
      <div className="text-[22px] font-bold">{question}</div>
        <div>
          {isOpen ? (
            <ChevronUpOutline height="25px" width="25px" />
          ) : (
            <ChevronDownOutline height="25px" width="25px" />
          )}
        </div>
      </div>
      {isOpen && <div className={'text-md mt-2 font-light'}>{answer}</div>}
    </div>
  )
}

export default FAQAnswer
