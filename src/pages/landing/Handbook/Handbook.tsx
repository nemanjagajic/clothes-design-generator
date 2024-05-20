import Slider, { LazyLoadTypes, Settings } from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../../../pages/landing/ShirtSlider/SliderStyle.css'

import PrevArrow from '../ShirtSlider/PrevArrow'
import NextArrow from '../ShirtSlider/NextArrow'
import HandbookSlide from './HandbookSlide'
import { CheckmarkCircle, CloseCircle } from 'react-ionicons'
import HandbookList from './HandbookList'

const incorrectPrompts = [
  'Aleksandar Vucic ucesnik Slagalice',
  'Kobi Brajant u dresu Beogradskog Partizana',
  'Poster za akcioni film sa tekstom "NOSI ŠTA MISLIŠ BAJO"',
  'Srpska zastava na Marsu',
  'Grb fudbalskog glupa Inter iz Milana',
]

const promptsCorrect = [
  'Rep grupa devojaka sa naočarama za sunce u jaknama',
  'Polje lala sa devojkom koja ima šešir i zalaskom sunca',
  'Vođnja bicikla u prirodi po putu',
  'Zvezde padalice u prirodi',
  'Goku na oblaku koji leti i smeje se u 2D',
  'Dva nasmejana zuba u stilu 3D animacije piju čaj',
  'Panda u anime stilu i plavokosa devojka sa naočarama se grle',
  'Bullmastif kao vojnik',
  'Majmun sa bananom',
  'Naruto programer i u pozadini je njegova slika',
  'Rihanna sedi za kompjuterom',
  'Elon Musk u Srpskoj narodnoj nošnji',
]

const whatAICanDo = {
  'Poznate ličnosti':
    ' Novak Đoković, Rihanna, Elon Musk, Lebron James, Vladimir Putin, Donald Trump i mnogi drugi...',
  Životinje: ' Sve životinje',
  'Raznoliki stilovi':
    ' 3D, Anime, ultra-realističan, crtani, apstraktni, retro...',
  Boje: ' Ai će kreirati sliku u bojama koje navedete - crno bela, pastelna, kombinacija više boja...',
  'Sve ostalo': 'Priroda, apstraktna umetnost...',
}

const whatAICantDo = {
  'Lokalno poznate ličnosti':
    ' Ceca, Aleksandar Vučić, Miloš Obilić, Karađorđe... ',
  'Eksplicitni sadržaj': ' Erotski sadržaj, psovke, uvrede, groteksni sadržaj',
  'Zastave i grbovi': ' Državne zastave, klubske, itd.',
  'Tekst na slici':
    ' Tekst kao deo slike trenutno nije moguć, Ai ne ume da piše :)',
  'Transparentne slike': ' Slike bez pozadine',
}

const correctPaths: { src: string; prompt: string }[] = Array.from(
  { length: 12 },
  (_, index) => {
    return {
      src: require(`../../../assets/handbook_examples/${index + 1}.png`),
      prompt: promptsCorrect[index],
    }
  },
)

const notCorrectPaths: { src: string; prompt: string }[] = Array.from(
  { length: 5 },
  (_, index) => {
    return {
      src: require(
        `../../../assets/handbook_incorrect_examples/${index + 1}.png`,
      ),
      prompt: promptsCorrect[index],
    }
  },
)

const Handbook = () => {
  const settings: Settings = {
    infinite: true,
    speed: 1000,
    autoplay: true,
    pauseOnHover: false,
    autoplaySpeed: 3000,
    slidesToScroll: 1,
    lazyLoad: 'progressive' as LazyLoadTypes,
    prevArrow: <PrevArrow />, // Custom previous arrow component
    nextArrow: <NextArrow />,
    slidesToShow: 1,
  }

  return (
    <div className="bg-nsm-gray-100 pt-12 flex flex-col justify-center items-center">
      <div className="text-4xl ml-4 font-bold my-6 text-start sm:text-center">
        Šta Ai (ne) može da kreira
      </div>
      <div className="flex flex-col sm:flex-row sm:w-full items-start justify-center sm:space-x-4 sm:space-y-0 space-y-4 p-4">
        <div className="bg-white rounded-xl p-4 w-full max-w-[480px] flex flex-col items-center justify-center">
          <div className="text-2xl mb-2 flex items-center space-x-2">
            <div>Šta može</div>
            <CheckmarkCircle color={'#3ec300'} height="28px" width="28px" />
          </div>
          <div
            className="
            sm:w-[350px]
            sm:h-[350px]
            md:w-[400px]
            md:h-[400px]
            lg:w-[450px]
            lg:h-[450px]
            
            w-[320px]
            h-[320px]
            group "
          >
            <Slider
              {...settings}
              className="flex sm:max-h-[450px] max-h-[320px] items-center jusfify-center"
            >
              {correctPaths.map((img, index) => (
                <div key={img.prompt} className="">
                  <HandbookSlide
                    src={img.src}
                    color="#0090F8"
                    prompt={promptsCorrect[index]}
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div
            className="
              mt-4
              break-words 
              sm:w-[350px]
              md:w-[400px]
              lg:w-[450px]
              w-[300px]
            "
          >
            <HandbookList
              rules={whatAICanDo}
              listIcon={
                <CheckmarkCircle color={'#3ec300'} height="18px" width="18px" />
              }
            />
            <p>
              Napomena: Ai može da kreira još mnogo toga što nismo direktno
              nabrojali, budite kreativni pri kreiranju slike za majicu jer su
              mogućnosti ogromne 🤯
            </p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 w-full max-w-[480px] flex flex-col items-center justify-center">
          <div className="text-2xl mb-2 flex items-center space-x-2">
            <div>Šta ne može</div>
            <CloseCircle color={'#ED2626'} height="28px" width="28px" />
          </div>
          <div
            className="  sm:w-[350px]
            sm:h-[350px]
            md:w-[400px]
            md:h-[400px]
            lg:w-[450px]
            lg:h-[450px]
            w-[320px]
            h-[320px]
            group
            "
          >
            <Slider
              {...settings}
              className="flex   sm:w-[350px]
            sm:h-[350px]
            md:w-[400px]
            md:h-[400px]
            lg:w-[450px]
            lg:h-[450px]
            w-[320px]
            h-[320px] items-center jusfify-center"
            >
              {notCorrectPaths.map((img, index) => (
                <div key={img.prompt} className=" ">
                  <HandbookSlide
                    src={img.src}
                    color={'#ED2626'}
                    prompt={incorrectPrompts[index]}
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div
            className="
              mt-4
              break-words 
              sm:w-[350px]
              md:w-[400px]
              lg:w-[450px]
              w-[320px]
            "
          >
            <HandbookList
              rules={whatAICantDo}
              listIcon={
                <CloseCircle color={'#ED2626'} height="18px" width="18px" />
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Handbook
