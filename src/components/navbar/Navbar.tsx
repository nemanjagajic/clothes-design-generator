import React from 'react'
import Container from '../shared/Container'
import { BagOutline } from 'react-ionicons'
import { scrollToSection } from '../../utils/pageNavigation'
// @ts-ignore
import logo from '../../assets/images/logo3.png'

type NavbarTypes = {
  onCartClicked: () => void
}

const Navbar = ({ onCartClicked }: NavbarTypes) => (
  <Container customStyles='fixed z-30 top-0 bg-white w-full'>
    <div className='flex flex-row w-full justify-between'>
      <img src={logo} width={100} />
      <div className='flex flex-row hidden sm:inline-flex'>
        <div
          onClick={() => scrollToSection('examples')}
          className='flex justify-center items-center px-8 cursor-pointer'
        >
          Primeri
        </div>
        <div
          onClick={() => scrollToSection('tShirtSizes')}
          className='flex justify-center items-center px-8 cursor-pointer'
        >
          Veličine
        </div>
        <div
          onClick={() => scrollToSection('questions')}
          className='flex justify-center items-center px-8 cursor-pointer'
        >
          Pitanja
        </div>
      </div>
      <div
        className='p-2 rounded-md shadow cursor-pointer my-8'
        onClick={onCartClicked}
      >
        <BagOutline height='25px' width='25px' />
      </div>
    </div>
  </Container>
)

export default Navbar
