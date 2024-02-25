import React, { useEffect, useState } from 'react'
import ExampleItem from '../../components/examples/ExampleItem'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {
  LARGE_SCREEN,
  MEDIUM_SCREEN,
  SMALL_SCREEN,
} from '../../constants/screenSizes'
// @ts-ignore
import logo from '../../assets/images/logo3.png'
// @ts-ignore
import imgFrog from '../../assets/images/example-frog.png'
// @ts-ignore
import imgCoffee from '../../assets/images/example-coffee.png'
// @ts-ignore
import imgNoleLidl from '../../assets/images/example-nole-lidl.png'
// @ts-ignore
import imgElonMusk from '../../assets/images/example-elon-musk.png'
// @ts-ignore
import imgAstronautDrinking from '../../assets/images/example_astronaut_drinking.png'

const SLIDER_SPEED = 500

const ExamplesCarousel = () => {
  const [selectedSlide, setSelectedSlide] = useState(0)

  const [numOfSlides, setNumOfSlides] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth
      if (screenWidth < LARGE_SCREEN) {
        setNumOfSlides(1)
      } else {
        setNumOfSlides(3)
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: SLIDER_SPEED,
    slidesToShow: numOfSlides,
    slidesToScroll: 1,
    customPaging: (slideIndex: number) => {
      return (
        <div
          style={{
            width: '10px',
            height: '10px',
            backgroundColor:
              selectedSlide === slideIndex ? '#0090F8' : '#e6e6e6',
            borderRadius: '50%',
          }}
        ></div>
      )
    },
    afterChange: (currentSlide: number) => {
      setSelectedSlide(currentSlide)
    },
    nextArrow: (
      <div
        style={{
          width: '30px',
          height: '30px',
          backgroundColor: '#0090F8',
          borderRadius: '50%',
        }}
      ></div>
    ),
  }

  return (
    <div className="flex flex-col items-center mt-14 sm:mt-24 mb-32">
      <h3
        id="examples"
        className="mb-16 text-main-black text-4xl font-extrabold"
      >
        Primeri
      </h3>
      <div className="w-9/12 m-auto">
        <Slider {...sliderSettings}>
          <ExampleItem
            imgSrc={imgAstronautDrinking}
            description="Astronaut pije koktel na plaži koja je na mesecu"
          />
          <ExampleItem
            imgSrc={imgNoleLidl}
            description="Novak Đoković kupuje smrznutu piletinu u lidlu i stvara gužvu"
          />
          <ExampleItem imgSrc={imgCoffee} description="Jutrić kafica" />
          <ExampleItem
            imgSrc={imgElonMusk}
            description="Elon Musk igra kolo u srpskoj narodnoj nošnji"
          />
          <ExampleItem
            imgSrc={imgFrog}
            description="Sedi žaba sama na listu lokvanja, sa naočarima i kapom"
          />
        </Slider>
      </div>
    </div>
  )
}

export default ExamplesCarousel
