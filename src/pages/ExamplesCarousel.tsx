import React, { useState } from 'react'
import ExampleItem from '../components/examples/ExampleItem'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const ExamplesCarousel = () => {
  const [selectedSlide, setSelectedSlide] = useState(0)

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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
      <h3 className='mb-16 text-main-black text-4xl font-extrabold'>Primeri</h3>
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