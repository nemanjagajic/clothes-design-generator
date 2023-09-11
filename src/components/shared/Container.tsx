import React from 'react'

const Container = ({ children, customStyles }: { children: React.ReactElement, customStyles?: string }) => {
  return (
    <div className={`flex justify-center ${customStyles}`}>
      <div className='flex w-9/12'>
        {children}
      </div>
    </div>
  )
}

export default Container