import React from 'react'
import Container from '../shared/Container'
import { BagOutline } from 'react-ionicons'
import { scrollToSection } from '../../utils/pageNavigation'
// @ts-ignore
import logo from '../../assets/images/logo3.png'
import { useNavigate } from 'react-router-dom'

type NavbarTypes = {
  onCartClicked: () => void
  itemCount: number
}

const Navbar = ({ onCartClicked, itemCount }: NavbarTypes) => {
  const navigate = useNavigate()
  return (
    <Container customStyles='h-[80px] fixed z-30 top-0 bg-nsm-gray-100 w-full shadow-md'>
      <div className='flex flex-row w-full justify-between'>
        <div
          className='flex justify-center items-center cursor-pointer'
          onClick={() => navigate('/')}
        >
          <div className='bg-white rounded-full'>
            <img className="h-[56px]" src={logo} />
          </div>
        </div>
        <div className='flex flex-row hidden lg:inline-flex'>
          <div
            onClick={() => scrollToSection('examples')}
            className='flex justify-center items-center px-8 cursor-pointer'
          >
            <div className='font-medium text-nsm-gray-200 hover:text-light-blue transition-width duration-200'>
              Primeri
            </div>
          </div>
          <div
            onClick={() => scrollToSection('tShirtSizes')}
            className='flex justify-center items-center px-8 cursor-pointer'
          >
            <div className='font-medium text-nsm-gray-200 hover:text-light-blue transition-width duration-200'>
              Veličine
            </div>
          </div>
          <div
            onClick={() => scrollToSection('questions')}
            className='flex justify-center items-center px-8 cursor-pointer'
          >
            <div className='font-medium text-nsm-gray-200 hover:text-light-blue transition-width duration-200'>
              Pitanja
            </div>
          </div>
          <div
            onClick={() => scrollToSection('our-users')}
            className='font-medium flex justify-center items-center px-8 cursor-pointer'
          >
            <div className='text-nsm-gray-200 hover:text-light-blue transition-width duration-200'>
              Naši korisnici
            </div>
          </div>
        </div>
        <div className='bg-white relative p-2 rounded-md shadow cursor-pointer h-[40px] w-[40px] my-auto'>
          {!!itemCount && <div
            className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center'
            style={{ minWidth: '24px' }}
          >
            {itemCount}
          </div>}
          <div onClick={onCartClicked}>
            <BagOutline height='25px' width='25px' />
          </div>
        </div>
      </div>
    </Container >
  )
}

export default Navbar
