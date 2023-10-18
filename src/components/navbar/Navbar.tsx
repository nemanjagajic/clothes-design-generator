import React from 'react'
import Container from '../shared/Container'

type NavbarTypes = {
  onCartClicked: () => void
}

const Navbar = ({ onCartClicked }: NavbarTypes) => {
  return (
    <Container>
      <div className='flex flex-row w-full justify-between py-6'>
        <div>Logo</div>
        <div className='flex flex-row'>
          <div className='px-8'>Veličine</div>
          <div className='px-8'>Kako da koristiš</div>
          <div className='px-8'>Pitanja</div>
        </div>
        <div className='cursor-pointer' onClick={onCartClicked}>Korpa</div>
      </div>
    </Container>
  )
}

export default Navbar