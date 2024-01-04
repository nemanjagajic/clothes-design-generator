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
  <Container customStyles='fixed z-30 top-0 bg-white w-full shadow-md'>
    <div className='flex flex-row w-full justify-between'>
      <div
        className='cursor-pointer'
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <img className="h-24" src={logo} />
      </div>
      <div className='flex flex-row hidden lg:inline-flex'>
        <div
          onClick={() => scrollToSection('examples')}
          className='flex justify-center items-center px-8 cursor-pointer'
        >
          <div className='border-transparent border-b-4 pt-4 pb-2 hover:border-light-blue transition-width duration-200'>
            Primeri
          </div>
        </div>
        <div
          onClick={() => scrollToSection('tShirtSizes')}
          className='flex justify-center items-center px-8 cursor-pointer'
        >
          <div className='border-transparent border-b-4 pt-4 pb-2 hover:border-light-blue transition-width duration-200'>
            Veličine
          </div>
        </div>
        <div
          onClick={() => scrollToSection('questions')}
          className='flex justify-center items-center px-8 cursor-pointer'
        >
          <div className='border-transparent border-b-4 pt-4 pb-2 hover:border-light-blue transition-width duration-200'>
            Pitanja
          </div>
        </div>
        <div
          onClick={() => scrollToSection('our-users')}
          className='flex justify-center items-center px-8 cursor-pointer'
        >
          <div className='border-transparent border-b-4 pt-4 pb-2 hover:border-light-blue transition-width duration-200'>
            Naši korisnici
          </div>
        </div>
      </div>
      <div
        className='p-2 rounded-md shadow cursor-pointer h-10 my-auto'
        onClick={onCartClicked}
      >
        <BagOutline height='25px' width='25px' />
      </div>
    </div>
  </Container>
)

export default Navbar
