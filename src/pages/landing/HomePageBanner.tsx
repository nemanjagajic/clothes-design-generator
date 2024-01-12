import React from 'react'
import Container from '../../components/shared/Container'
import Button from "../../components/shared/Button";
import {scrollToSection} from "../../utils/pageNavigation";

const HomePageBanner = () => {
  return (
    <Container customStyles='bg-dark-blue py-8 mt-16 sm:mt-20'>
      <div className='flex flex-col w-full items-center justify-center'>
        <div className='flex flex-col w-full items-center pb-4 md:pt-8 md:pb-6 md:text-center'>
          <h2 className='text-white text-5xl font-bold leading-tight'>
            <div>
              Od tvoje mašte do stvarnosti
            </div>
            <span>Dizajniraj</span>
            <span className='italic text-light-blue font-normal'>
              {' '}
              majicu u minuti{' '}
            </span>
            <span>!</span>
          </h2>
        </div>
        <p className='text-white'>
          Zamislite. Opišite. Oživite Vaš jedinstveni
        </p>
        <p className='text-white mb-10'>
          dizajn majice, brzo i lako.
        </p>
        <Button text={'Napravi svoj dizajn majice'} onClick={() => scrollToSection('t-shirt-container')} />
      </div>
    </Container>
  )
}

export default HomePageBanner
