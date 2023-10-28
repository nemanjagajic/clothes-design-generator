import React from 'react'
import Container from '../shared/Container'
import { BagOutline } from 'react-ionicons'
import { goToSection } from '../../utils/pageNavigation'

type NavbarTypes = {
  onCartClicked: () => void
}

const Navbar = ({ onCartClicked }: NavbarTypes) => (
  <Container>
    <div className='flex flex-row w-full justify-between py-6'>
      <div className='flex justify-center items-center cursor-pointer'>Logo</div>
      <div className='flex flex-row'>
        <div onClick={() => goToSection('examples')} className='flex justify-center items-center px-8 cursor-pointer'>Primeri</div>
        <div onClick={() => goToSection('tShirtSizes')} className='flex justify-center items-center px-8 cursor-pointer'>Veličine</div>
        <div onClick={() => goToSection('questions')} className='flex justify-center items-center px-8 cursor-pointer'>Pitanja</div>
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

export default Navbar