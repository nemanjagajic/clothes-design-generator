import React from 'react'
import Container from '../components/shared/Container'

const OurCustomers = () => {
  const renderCustomerImage = (key: number) => (
    <div
      key={key}
      className='h-[320px] w-[260px] bg-white mx-8 rounded-xl'
    />
  )

  return (
    <Container customStyles='bg-dark-blue pb-16'>
      <div className='flex flex-col justify-center items-center w-full'>
        <h3 className='mt-8 mb-12 text-white text-4xl font-extrabold'>Naši korisnici</h3>
        <div className='flex flex-row justify-center w-full'>
          {Array.from({ length: 3 }).map((_, index) => renderCustomerImage(index))}
        </div>
      </div>
    </Container>
  )
}

export default OurCustomers