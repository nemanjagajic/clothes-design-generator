import Slider from 'react-slick'
import SliderItem from './SliderItem'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './SliderStyle.css'
import PrevArrow from './PrevArrow'
import NextArrow from './NextArrow'
import { useEffect, useRef, useState } from 'react'
//@ts-ignore
import whiteShirt from '../../../assets/images/Tshirt_white.png'
//@ts-ignore
import blackShirt from '../../../assets/images/Tshirt_black.png'

const prompts = [
  'Beba Rubeus Hagrid',
  'Astronaut surfuje u svemiru',
  'Rep grupa mačića u jaknama, sa sunčanim naočarima',
  'Muški vanzemaljac "Mister univerzuma"',
  '2d morski talasi',
  'DJ Superman na žurci',
  'Renovirane egipatske piramide 3024 godine',
  'Elon musk u tradicionalnoj srpskoj nošnji uskače u kolo',
  'Beba Draco Malfoy',
  'Astronaut kulira uz sok na marsu',
  'Pomeranac u svemiru vija hranu',
  'Sedi žaba sama na listu lokvanja i pije rakiju',
  'Petlovi kao italijanska mafija',
  'Barbie Mona Lisa',
  'Pomeranac vija hranu u svemiru',
  'Apstraktna umetnost u stilu Pabla pikasa, boje crvena, žuta i plava',
  'Vanzemaljac "Miss Univerzuma"',
  'Jutrić kafica sa pogledom',
  'Star Wars tematske poštanske markice',
  'Astronaut na mesecu pije koktel',
  '2D morski talasi',
  'Raphaello from TMNT as a baby',
  'Avengers bebe',
  'Astronaut na mesecu pije koktel',
  'Novak Djokovic se bori sa penzionerima za piletinu u Lidlu',
  'Beba Ron Weasley',
  'Stara slika u retro stilu, crno-beli, analogni selfi turističkog vanzemaljca',
  'Kosturi na rege koncertu',
]

const imagePaths: { src: string; prompt: string }[] = Array.from(
  { length: 28 },
  (_, index) => {
    return {
      src: require(`../../../assets/resized_examples/${index + 1}.png`),
      prompt: prompts[index],
    }
  },
)
const ShirtSlider = () => {
  const sliderRef = useRef(null)
  const [slidesToShow, setSlidesToShow] = useState(1)
  const settings = {
    infinite: true,
    speed: 1000,
    autoplay: true,
    slidesToShow: slidesToShow,
    autoplaySpeed: 2000, // Set your desired autoplay speed in milliseconds
    // 3 seconds
    centerMode: true,
    centerPadding: '10px', // Adjust as needed
    prevArrow: <PrevArrow />, // Custom previous arrow component
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 830,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '0px',
          swipeToSlide: true,
          speed: 1000,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '30px',
          swipeToSlide: true,
          speed: 1000,
        },
      },
      {
        breakpoint: 390,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '15px',
          swipeToSlide: true,
          speed: 1000,
        },
      },
      {
        breakpoint: 380,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '10px',
          swipeToSlide: true,
          speed: 1000,
        },
      },
    ],
  }

  useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current) {
        //@ts-ignore
        const containerWidth = sliderRef.current.clientWidth
        const slideWidth = containerWidth < 768 ? 410 : 410
        const slidesToShow = Math.floor(containerWidth / slideWidth) // Replace YOUR_SLIDE_WIDTH with your actual slide width
        setSlidesToShow(slidesToShow)
      }
    }

    // Initial setup
    handleResize()

    // Listen for window resize events
    window.addEventListener('resize', handleResize)

    // Cleanup on unmount
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div ref={sliderRef}>
      <Slider {...settings}>
        {imagePaths.map((img, index) => (
          <SliderItem
            key={img.src}
            {...img}
            shirtSrc={index % 2 === 1 ? whiteShirt : blackShirt}
          />
        ))}
      </Slider>
    </div>
  )
}

export default ShirtSlider
