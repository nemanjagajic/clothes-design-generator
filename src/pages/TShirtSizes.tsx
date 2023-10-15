import React from 'react'
// @ts-ignore
import tShirtSizesImg from '../assets/images/tshirt-sizes.png'

const TShirtSizes = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <h3 className='mb-10 text-main-black text-4xl font-extrabold'>
        Odaberi odgovarajuću veličinu majice
      </h3>
      <div className='flex items-center justify-center bg-dark-blue pt-8 pb-4 w-full'>
        <img width={800} src={tShirtSizesImg} />
      </div>
    </div>
  )
}

export default TShirtSizes