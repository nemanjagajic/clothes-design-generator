import React, { useState } from 'react'
import { useWindowWidth } from '../../utils/useWindowWidth'
import { LARGE_SCREEN } from '../../constants/screenSizes'
import {
  ChevronForward
} from 'react-ionicons'
//@ts-ignore
import minja from '../../assets/testimonials/minja.png'
//@ts-ignore
import vlada from '../../assets/testimonials/vlada.png'

import ButtonNavigate from '../../components/shared/ButtonNavigate'
import ExpandableText from '../../components/shared/ExpandableText'
import ImageSlider from '../../components/shared/ImageSlider'

const images = [
  { name: "Minja Brka", src: minja, description: "Oduševljen sam! Kupio sam majicu sa sopstvenim dizajnom i rezultat je izvanredan. Kvalitet pamuka je top, a print je savršen - oštar i živopisan. Definitivno preporučujem svima!" },
  { name: "Vladimir", src: vlada, description: "Majica s mojim dizajnom premašila je očekivanja - neverovatno mekan pamuk i izvanredan print. Boje i detalji su perfektni. Više od odeće, to je umetnost koju ponosno nosim. Toplo preporučujem!" }]

const OurCustomers = () => {
  const windowWidth = useWindowWidth()

  const renderCustomerImage = (key: number, image: string, name: string, description: string) => (
    <div
      key={key}
      className="h-[470px] flex justify-center min-w-[310px] xl:h-[600px] xl:min-w-[340px] bg-nsm-gray-100 mx-4 rounded-xl mb-6 relative"
    >
      <img src={image} alt="" />
      <div className='absolute bottom-0 w-full p-3 bg-nsm-gray-300 rounded-b-xl'>
        <div className='text-[22px] pb-2'>{name}</div>
        <ExpandableText text={description} maxLength={100} />
      </div>
    </div >
  )

  return (
    <div className="bg-white pb-16" id='our-users'>
      <div className="flex flex-col justify-center items-center w-full">
        <h2 className="text-black text-[44px] sm:text-5xl sm:text-center font-bold leading-tight pb-10 pt-24">
          Utisci
        </h2>
        {windowWidth >= LARGE_SCREEN ? (
          <div className="flex lg:flex-row flex-col justify-center items-center w-full overflow-x-auto">
            {Array.from({ length: images.length }).map((_, index) =>
              renderCustomerImage(index, images[index].src, images[index].name, images[index].description),
            )}
          </div>
        ) : (
          <ImageSlider />
        )}
      </div>
    </div>
  )
}

export default OurCustomers
