import React from 'react'

// @ts-ignore
import imgTShirtPomeranian from '../../assets/images/t-shirt-pomeranian-example.png'
// @ts-ignore
import imgArrow1 from '../../assets/images/arrow-1.png'
// @ts-ignore
import imgArrow2 from '../../assets/images/arrow-2.png'
// @ts-ignore
import imgArrow3 from '../../assets/images/arrow-3.png'
// @ts-ignore
import imgArrow1Small from '../../assets/images/arrow-1-small.png'

// @ts-ignore
import imgExampleInputTShirtPomeranian from '../../assets/images/example-input-tshirt-pomeranian.png'
import { useWindowWidth } from '../../utils/useWindowWidth'
import { MEDIUM_SCREEN } from '../../constants/screenSizes'
import TypingAnimation from '../../components/shared/TypingAnimation'
const ExampleSection = () => {
  const windowWidth = useWindowWidth()

  const renderDesktopContent = () => (
    <>
      <div className="absolute top-20 px-4 md:px-8 lg:px-16 xl:px-32 z-10 ">
        <h2 className="text-black text-[44px] sm:text-5xl sm:text-center font-bold leading-tight">
          Ovo smo opisali
        </h2>
        <img
          src={imgArrow1}
          className="
          z-20
          absolute
          h-[160px]
          sm:left-[30px]
          md:left-[150px]
          lg:h-[200px]
          lg:left-[200px]
          xl:h-[270px]
          xl:left-[180px]
          lxl:left-[180px]
          2xl:left-[150px]"

        />
        <div className="p-2
          border-4
          border-[#f8cc5b]
          rounded-md
          text-[28px]
          absolute
          w-[300px]
          h-[100px]
          bg-white
          left-[130px]
          top-[150px]
          md:left-[280px]
          lg:top-[190px]
          lg:left-[390px]
          xl:top-[250px]
          xl:left-[400px]
          lxl:left-[400px]
          2xl:left-[370px]">
          <TypingAnimation text="Pomeranac vija hranu u svemiru" speed={50} />
        </div>
        <img
          src={imgArrow2}
          className="
            z-20
            absolute
            h-[70px]
            left-[200px]
            md:top-[290px]
            md:left-[350px]
            md:rotate-[40deg]
            lg:h-[80px]
            lg:top-[310px]
            lg:left-[430px]
            lg:rotate-[0deg]
            xl:h-[100px]
            xl:top-[420px]
            xl:left-[400px]
            xl:rotate-[40deg]
            lxl:left-[400px]
            2xl:left-[520px]
          "
        />
        <div className="
          flex
          items-center
          clip-angled-edges
          p-2
          pl-3
          text-[28px]
          absolute
          w-[210px]
          text-white
          left-[350px]
          h-[40px]
          bg-nsm-orange
          top-[300px]
          md:left-[460px]
          md:top-[370px]
          lg:top-[360px]
          lg:left-[600px]
          xl:top-[540px]
          xl:left-[570px]
          lxl:left-[570px]
          2xl:left-[680px]
        ">
          Ovo smo dobili
        </div>
        <img
          src={imgArrow3}
          className="
            z-20
            absolute
            h-[25px]
            top-[350px]
            left-[560px]
            md:left-[680px]
            md:scale-y-[-1]
            md:top-[400px]
            lg:h-[30px]
            lg:top-[380px]
            lg:left-[830px]
            lg:scale-y-[-1]
            xl:h-[40px]
            xl:top-[560px]
            xl:rotate-[30deg]
            xl:left-[800px]
            xl:scale-y-[1]
            lxl:left-[800px]
            2xl:left-[915px]
            "
        />
      </div>
      <img
        src={imgTShirtPomeranian}
        className={
          'absolute bottom-0 right-2 lg:right-4 xl:right-[150px] sm:h-[400px] md:h-[500px] lg:h-[500px] xl:h-[650px]'
        }
      />
    </>
  )

  const renderMobileContent = () => (
    <div className="w-full h-full">
      <div className="absolute top-20 px-4 z-10">
        <h2 className="text-black text-[44px] font-bold leading-tight">
          Ovo smo opisali
        </h2>
        <img
          src={imgArrow1Small}
          className="absolute h-[120px] top-[40px] left-[280px] z-20"
        />
      </div>
      <div className="flex mt-[240px] w-full px-2">
        <img
          src={imgExampleInputTShirtPomeranian}
          className={'h-full m-auto'}
        />
      </div>
    </div>
  )

  return (
    <div className="relative flex w-full min-h-screen bg-nsm-gray-100">
      {windowWidth > MEDIUM_SCREEN
        ? renderDesktopContent()
        : renderMobileContent()}
    </div>
  )
}

export default ExampleSection
