import React from 'react'
import Container from '../shared/Container'

const Navbar = () => {
  return (
    <Container>
      <div className='flex flex-row w-full justify-between py-6'>
        <div>Logo</div>
        <div className='flex flex-row'>
          <div className='px-8'>Veličine</div>
          <div className='px-8'>Kako da koristiš</div>
          <div className='px-8'>Pitanja</div>
        </div>
        <div>Korpa</div>
      </div>
    </Container>
  )
}

export default Navbar