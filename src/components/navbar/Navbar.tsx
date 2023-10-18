import React from 'react'
import Container from '../shared/Container'
import { BagOutline } from 'react-ionicons'

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
        <div className='p-2 rounded-md shadow cursor-pointer'>
          <BagOutline
            onClick={onCartClicked}
            height="25px"
            width="25px"
          />
        </div>
      </div>
    </Container>
  )
}

export default Navbar