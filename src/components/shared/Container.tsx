import React from 'react'

const Container = ({
  children,
  customStyles,
}: {
  children: React.ReactElement
  customStyles?: string
}) => {
  return (
    <div className={`flex justify-center ${customStyles}`}>
      <div className="flex w-full px-4 md:px-8 lg:px-16 xl:px-32 ">{children}</div>
    </div>
  )
}

export default Container
