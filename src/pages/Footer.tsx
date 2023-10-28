import React from 'react'
import Container from '../components/shared/Container'
import Button from '../components/shared/Button'
import { goToSection } from '../utils/pageNavigation'

const Footer = () => {

  const renderSection = (section: React.ReactNode, isMain = false) => (
    <div className={`flex ${isMain ? 'flex-2' : 'flex-1'} flex-col justify-between h-[120px] mx-4`}>
      {section}
    </div>
  )
  const renderContactSection = () => {
    const sectionContent = (
      <>
        <div className='w-[90px] h-[40px] bg-gray-300' />
        <div>
          <div className='text-light-gray text-xs pb-4'>+381 64 221 492</div>
          <div className='text-light-gray text-xs'>Odštampaj misao</div>
        </div>
      </>
    )
    return renderSection(sectionContent)
  }

  const renderPagesSection = () => {
    const sectionContent = (
      <>
        <div className='text-black text-md pb-2 font-bold'>Stranice</div>
        <div onClick={() => goToSection('examples')} className='text-light-gray text-xs cursor-pointer'>Primeri</div>
        <div onClick={() => goToSection('tShirtSizes')} className='text-light-gray text-xs cursor-pointer'>Veličine</div>
        <div onClick={() => goToSection('questions')} className='text-light-gray text-xs cursor-pointer'>Pitanja</div>
      </>
    )
    return renderSection(sectionContent)
  }

  const renderSocialsSection = () => {
    const sectionContent = (
      <>
        <div>
          <div className='text-black text-md pb-4 font-bold'>Zaprati nas</div>
          <div className='flex flex-row'>
            <div className='w-[20px] h-[20px] bg-gray-300 mr-2 rounded-sm' />
            <div className='w-[20px] h-[20px] bg-gray-300 mr-2 rounded-sm' />
            <div className='w-[20px] h-[20px] bg-gray-300 mr-2 rounded-sm' />
          </div>
        </div>
      </>
    )
    return renderSection(sectionContent)
  }

  const renderEmailSection = () => {
    const sectionContent = (
      <>

        <div className='text-black text-md pb-4 font-bold'>Pošalji nam email</div>
        <div className='text-light-gray text-xs'>
          Pošalji nam email i mi ćemo te obaveštavati o novim artiklima na našem sajtu.
        </div>
        <div className='flex flex-row justify-between w-full'>
          <input
            placeholder={'Email'}
            className='h-[35px] border p-2 rounded-md text-sm w-full mr-2'
          />
          <Button
            customStyles={'h-[35px] w-[120px] pb-0 pt-0'}
            isMain={true}
            text={'Pošalji'}
            onClick={() => console.log('Posalji')}
          />
        </div>
      </>
    )
    return renderSection(sectionContent, true)
  }

  return (
    <Container>
      <div className='flex flex-row border border-t-1 border-x-0 border-b-0 border-border-gray mt-48 pt-8 pb-12 w-full'>
        {renderContactSection()}
        {renderPagesSection()}
        {renderSocialsSection()}
        {renderEmailSection()}
      </div>
    </Container>
  )
}

export default Footer