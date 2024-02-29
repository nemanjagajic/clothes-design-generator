import React from 'react'
import Container from '../../components/shared/Container'
import Button from '../../components/shared/Button'
import { scrollToSection } from '../../utils/pageNavigation'

const HomePageBanner = () => {
  return (
    <div className="bg-dark-blue px-4 py-8 mt-20">
      <div className="flex flex-col w-full sm:items-center sm:justify-center">
        <div className="flex flex-col w-full items-center pb-4 md:pt-8 md:pb-6 md:text-center">
          <h2 className="text-white text-[44px] sm:text-7xl font-bold leading-tight">
            <span>Opiši sliku   </span>
            <span className="sm:text-7xl italic text-light-blue bold">
              {' '}
              kakvu želiš{' '}
            </span>
            <span>da</span>
            <div>nosiš na majici</div>
          </h2>
        </div>
        <p className="text-white text-xl">
          Kada opišeš Ai će kreirati četiri verzije slike za manje od
        </p>
        <p className="text-white mb-10 text-xl">minut, izaberi koja ti se najviše sviđa i poruči</p>
        <Button
          text={'Napravi svoj dizajn majice'}
          onClick={() => scrollToSection('t-shirt-container')}
        />
      </div>
    </div>
  )
}

export default HomePageBanner
