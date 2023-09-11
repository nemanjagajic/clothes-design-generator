import React from 'react'
import Container from '../components/shared/Container'

const HomePageBanner = () => {
  return (
    <Container customStyles='bg-dark-blue py-8'>
      <div className='flex flex-col'>
        <div className='flex flex-col w-full items-center py-8 text-center'>
          <h2 className='text-white text-6xl font-bold leading-tight'>
            Napravi majicu sa slikom kakvu zamišljaš za
            <span className='italic text-light-blue font-normal'> 40 sekundi </span>
            bez dizajnera
          </h2>
        </div>
        <div className='flex flex-row text-white mt-6 w-full'>
          <div className='flex flex-row justify-center items-center w-1/3 mr-6'>
            <div className='mr-4 font-bold text-2xl'>1</div>
            <div>U polje ispod opiši kakvu sliku zamišljaš na majici. Npr. "Slatki mali kuca pije kafu"</div>
          </div>
          <div className='flex flex-row justify-center items-center w-1/3'>
            <div className='mr-4 font-bold text-2xl'>2</div>
            <div>Zatim odredi u kojem stilu želis taj vizual da bude pa pritisni dugme generiši i sa desne strane će biti majica sa tvojim vizualom</div>
          </div>
          <div className='flex flex-row justify-center items-center w-1/3 ml-6'>
            <div className='mr-4 font-bold text-2xl'>3</div>
            <div>Kada generiše vizual odredi koja boja ti odgovara majice, odaberi veličinu i klikni na dugme ‘kupi ovu majicu’</div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default HomePageBanner