import React from 'react'
import Container from '../../components/shared/Container'
import Button from '../../components/shared/Button'
import { scrollToSection } from '../../utils/pageNavigation'

const HomePageBanner = () => {
  return (
    <div className="bg-dark-blue px-4 py-8 mt-16 sm:mt-20">
      <div className="flex flex-col w-full sm:items-center sm:justify-center">
        <div className="flex flex-col w-full items-center pb-4 md:pt-8 md:pb-6 md:text-center">
          <h2 className="text-white text-[44px] sm:text-5xl font-bold leading-tight">
            <div>Od tvoje mašte do stvarnosti</div>
            <span>Dizajniraj</span>
            <span className="italic text-light-blue bold">
              {' '}
              majicu u minuti{''}
            </span>
            <span className="pl-1 sm:pl-2">!</span>
          </h2>
        </div>
        <p className="text-white">
          Zamislite. Opišite. Oživite Vaš jedinstveni
        </p>
        <p className="text-white mb-10">dizajn majice, brzo i lako.</p>
        <Button
          text={'Napravi svoj dizajn majice'}
          onClick={() => scrollToSection('t-shirt-container')}
        />
      </div>
    </div>
  )
}

export default HomePageBanner
