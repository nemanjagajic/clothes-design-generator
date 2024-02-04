import React, { useState } from 'react'
import { ChevronForward, ChevronBack } from 'react-ionicons'

type ButtonNavigateTypes = {
  direction: "NEXT" | "BACK"
}
const ButtonNavigate = ({ direction = "NEXT" }: ButtonNavigateTypes) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`flex items-center justify-center height-[42px] w-[110px] p-2 rounded-3xl border border-1 border-light-blue mx-2 hover:bg-light-blue transition-all ease-in cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {direction === "NEXT" ? (
        <ChevronForward
          color={isHovered ? 'white' : '#0090F8'}
          height="30px"
          width="30px"
        />
      ) : (
        <ChevronBack
          color={isHovered ? 'white' : '#0090F8'}
          height="30px"
          width="30px"
        />
      )}
    </div>
  )
}

export default ButtonNavigate