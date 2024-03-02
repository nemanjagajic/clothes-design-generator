import React, { useState } from 'react'
import { ChevronForward, ChevronBack } from 'react-ionicons'

type ButtonNavigateTypes = {
  direction: "NEXT" | "BACK"
  onClick: () => void
}
const ButtonNavigate = ({ direction = "NEXT", onClick }: ButtonNavigateTypes) => {

  return (
    <div
      className={`flex items-center justify-center height-[42px] w-[110px] p-2 rounded-3xl border border-1 border-light-blue mx-2 transition-all ease-in cursor-pointer outline-none`}
    >
      {direction === "NEXT" ? (
        <ChevronForward
          color={'#0090F8'}
          height="30px"
          width="30px"
          onClick={onClick}
        />
      ) : (
        <ChevronBack
          color={'#0090F8'}
          height="30px"
          width="30px"
          onClick={onClick}
        />
      )}
    </div>
  )
}

export default ButtonNavigate
