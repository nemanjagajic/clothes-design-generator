import React from 'react'
import Container from '../../components/shared/Container'
import Button from '../../components/shared/Button'
import { scrollToSection } from '../../utils/pageNavigation'
import ShirtSlider from './ShirtSlider/Slider'

const HomePageBanner = () => {
  return (
    <div className="bg-dark-blue ">
      <div className="px-2 py-8 mt-20">
        <div className="flex flex-col w-full items-center justify-center">
          <div className="flex flex-col sm:w-2/3 items-center pb-4 md:pt-8 md:pb-6 md:text-center">
            <h2 className="text-white text-start text-[44px] sm:text-7xl font-bold leading-tight sm:text-center">
              Dizajniraj svoju unikatnu majicu za 30s{' '}
              <hr className="border-none" /> uz pomoć AI
            </h2>
          </div>
          <p className="text-white  text-xl mb-10 max-w-[700px] text-start sm:text-center">
            Opiši šta želiš i Veštačka Inteligencija će kreirati četiri verzije
            slike za pola minuta, izaberi koja ti se najviše sviđa i poruči
          </p>
          <Button
            customStyles="w-full sm:w-[300px]"
            text={'Napravi svoj dizajn majice'}
            onClick={() => scrollToSection('t-shirt-container')}
          />
        </div>
      </div>
      <div className="py-10">
        <ShirtSlider />
      </div>
    </div>
  )
}

export default HomePageBanner
