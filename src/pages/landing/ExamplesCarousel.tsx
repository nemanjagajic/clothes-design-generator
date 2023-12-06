import React, {useEffect, useState} from 'react'
import ExampleItem from '../../components/examples/ExampleItem'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {MEDIUM_SCREEN, SMALL_SCREEN} from "../../constants/screenSizes"

const BREAKPOINT_OFFSET = 80
const SLIDER_SPEED = 500

const ExamplesCarousel = () => {
  const [selectedSlide, setSelectedSlide] = useState(0)

    const [numOfSlides, setNumOfSlides] = useState(3)

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth < SMALL_SCREEN + BREAKPOINT_OFFSET) {
                setNumOfSlides(1)
            } else if (screenWidth < MEDIUM_SCREEN + BREAKPOINT_OFFSET) {
                setNumOfSlides(2)
            } else {
                setNumOfSlides(3)
            }
        }

        handleResize()

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
            backgroundColor: selectedSlide === slideIndex ? '#0090F8' : '#e6e6e6',
            borderRadius: '50%'
          }}
        >
        </div>
      )
    },
    afterChange: (currentSlide: number) => {
      setSelectedSlide(currentSlide)
    },
    nextArrow: <div
      style={{
        width: '30px',
        height: '30px',
        backgroundColor: '#0090F8',
        borderRadius: '50%'
      }}
    >
    </div>
  }

  return (
    <div className='flex flex-col items-center my-32'>
      <h3 id='examples' className='mb-16 text-main-black text-4xl font-extrabold'>Primeri</h3>
      <div className='w-9/12 m-auto'>
        <Slider {...sliderSettings}>
          <ExampleItem />
          <ExampleItem />
          <ExampleItem />
          <ExampleItem />
          <ExampleItem />
        </Slider>
      </div>
    </div>
  )
}

export default ExamplesCarousel