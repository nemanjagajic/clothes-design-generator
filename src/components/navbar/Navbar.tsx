import React, { useState, useEffect } from 'react'
import Container from '../shared/Container'
import { scrollToSection } from '../../utils/pageNavigation'
// @ts-ignore
import logo from '../../assets/images/logo3.png'
import { useNavigate } from 'react-router-dom'
import { TimerOutline, BagHandleOutline } from 'react-ionicons'

type NavbarTypes = {
  onCartClicked: (() => void) | null
  onHistoryClicked?: (() => void) | null
  itemCount: number
}

const Navbar = ({ onCartClicked, itemCount, onHistoryClicked
}: NavbarTypes) => {
  const navigate = useNavigate()

  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      const currentScrollY = window.scrollY
      setVisible(currentScrollY < lastScrollY || currentScrollY <= 0)
      setLastScrollY(currentScrollY)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar)

      return () => window.removeEventListener('scroll', controlNavbar)
    }
  }, [lastScrollY])

  return (
    <Container
      customStyles={`
      h-[80px]
      fixed
      z-30
      top-0
      bg-nsm-gray-100
      w-full
      shadow-md
      transition-transform
      duration-300 ${visible ? 'transform translate-y-0' : 'transform -translate-y-full'
        }`}
    >
      <div className="flex flex-row w-full justify-between text-xl ">
        <div
          className="flex justify-center items-center cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="bg-white rounded-full">
            <img className="h-[56px]" src={logo} />
          </div>
        </div>
        {!!onCartClicked && (<div className="flex flex-row hidden lg:inline-flex">
          <div
            onClick={() => scrollToSection('examples')}
            className="flex justify-center items-center px-8 cursor-pointer"
          >
            <div className="text-nsm-gray-200 hover:text-light-blue transition-text duration-200">
              Primeri
            </div>
          </div>
          <div
            onClick={() => scrollToSection('tShirtSizes')}
            className="flex justify-center items-center px-8 cursor-pointer"
          >
            <div className="text-nsm-gray-200 hover:text-light-blue transition-text duration-200">
              Veličine
            </div>
          </div>
          <div
            onClick={() => scrollToSection('questions')}
            className="flex justify-center items-center px-8 cursor-pointer"
          >
            <div className="text-nsm-gray-200 hover:text-light-blue transition-text duration-200">
              Pitanja
            </div>
          </div>
          <div
            onClick={() => scrollToSection('our-users')}
            className="flex justify-center items-center px-8 cursor-pointer"
          >
            <div className="text-nsm-gray-200 hover:text-light-blue transition-text duration-200">
              Utisci
            </div>
          </div>
        </div>)}
        <div className='flex'>
          {!!onHistoryClicked && (
            <div id={'history-button'} onClick={onHistoryClicked} className="bg-white mx-2 flex justify-center items-center relative p-2 rounded-md shadow cursor-pointer h-[40px] w-[40px] my-auto">
              <TimerOutline
                color={'#00000'}
                title={"Istorija"}
                height="30px"
                width="30px"
              />
            </div>)}
          {!!onCartClicked && (
            <div id={'cart-button'} onClick={onCartClicked} className="bg-white mx-2 flex justify-center items-center relative rounded-md shadow cursor-pointer h-[40px] w-[40px] my-auto">
              {!!itemCount && (
                <div
                  className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center"
                  style={{ minWidth: '24px' }}
                >
                  {itemCount}
                </div>
              )}
              <div className='flex items-center justify-center'>
                <BagHandleOutline
                  color={'#00000'}
                  title={"cart"}
                  height="30px"
                  width="30px"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}

export default Navbar
