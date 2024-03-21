import React from 'react'
import { useWindowWidth } from '../../utils/useWindowWidth'
import { LARGE_SCREEN } from '../../constants/screenSizes'
//@ts-ignore
import minja from '../../assets/testimonials/minja.png'
//@ts-ignore
import vlada from '../../assets/testimonials/vlada.png'
//@ts-ignore
import nemanja from '../../assets/testimonials/nemanja.png'

import ExpandableText from '../../components/shared/ExpandableText'
import ImageSlider from '../../components/shared/ImageSlider'

interface Testimonial {
  name: string
  prompt: string
  description: string
  src: string
}

const images: Testimonial[] = [
  { prompt: "Apstraktna slika brke", name: "Minja Brka", src: minja, description: "Kupio sam majicu sa sopstvenim dizajnom i rezultat je top. Kvalitet pamuka je top, a print je savršen - oštar i živopisan." },
  { prompt: "Astronaut jaše konja u svemiru", name: "Vladimir", src: vlada, description: "Bilo je jako zabavno kreirati sopstveni print, nešto unikatno što niko na svetu nema. Kao da su po meni krojili majicu, jako je udobna i kvalitet se oseti na dodir. Sve preporuke!" },
  { prompt: "Čovek i priroda kroz VR", name: "Nemanja", src: nemanja, description: "Oduševljen sam majicom koju sam dizajnirao koristeći nosi šta misliš - proces je bio jednostavan, a rezultat impresivan. Kvalitet štampe i materijala je izvanredan, što čini ovu majicu posebnom u mojoj kolekciji." }
]

const OurCustomers = () => {
  const windowWidth = useWindowWidth()

  const renderCustomerImage = (key: number, data: Testimonial) => (
    <div
      key={key}
      className="h-[470px] flex justify-center min-w-[310px] xl:h-[600px] xl:min-w-[340px] bg-nsm-gray-100 mx-4 rounded-xl mb-6 relative"
    >
      <img src={data.src} alt="" />
      <div className='absolute bottom-0 w-full p-3 bg-nsm-gray-300 rounded-b-xl'>
        <div className='text-[18px] pb-2'>"{data.prompt}"</div>
        <div className='text-lg italic'>{`- ${data.name}`}</div>
        <hr className='border-gray-400 my-2' />
        <ExpandableText text={data.description} />
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
              renderCustomerImage(index, images[index]),
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
