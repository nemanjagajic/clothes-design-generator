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
    <div className='w-9/12 m-auto my-40'>
      <Slider {...sliderSettings}>
        <ExampleItem />
        <ExampleItem />
        <ExampleItem />
        <ExampleItem />
        <ExampleItem />
      </Slider>
    </div>
  )
}

export default ExamplesCarousel