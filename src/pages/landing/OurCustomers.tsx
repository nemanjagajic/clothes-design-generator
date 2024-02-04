import React from 'react'
import Container from '../../components/shared/Container'

const OurCustomers = () => {
  const renderCustomerImage = (key: number) => (
    <div
      key={key}
      className="h-[470px] min-w-[310px] xl:h-[500px] xl:min-w-[340px] bg-nsm-gray-100 mx-4 rounded-xl mb-6 relative"
    >
      <div className='absolute bottom-0 w-full p-3 bg-nsm-gray-300 rounded-b-xl'>
        <div className='text-[22px] pb-2'>Milos vukovic</div>
        <div className='text-[15px]'>"Generisao sam Elon Muska koji igra kolo, mislim da cu napraviti lager sa ovim majicama"</div>
      </div>
    </div>
  )

  return (
    <div className="bg-white pb-16">
      <div className="flex flex-col justify-center items-center w-full">
        <h2 className="text-black text-[44px] sm:text-5xl sm:text-center font-bold leading-tight pb-10 pt-24">
          Utisci
        </h2>
        <div className="flex lg:flex-row flex-col justify-center items-center w-full overflow-x-auto">
          {Array.from({ length: 3 }).map((_, index) =>
            renderCustomerImage(index),
          )}
        </div>
      </div>
    </div>
  )
}

export default OurCustomers
