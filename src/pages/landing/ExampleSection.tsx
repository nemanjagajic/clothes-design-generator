import React from 'react';

// @ts-ignore
import imgTShirtPomeranian from '../../assets/images/t-shirt-pomeranian-example.png';
// @ts-ignore
import imgArrow1 from '../../assets/images/arrow-1.png';
// @ts-ignore
import imgArrow2 from '../../assets/images/arrow-2.png';
// @ts-ignore
import imgArrow3 from '../../assets/images/arrow-3.png';
// @ts-ignore
import imgArrow1Small from '../../assets/images/arrow-1-small.png';
// @ts-ignore
import imgArrow2Small from '../../assets/images/arrow-2-small.png';
// @ts-ignore
import imgArrow3Small from '../../assets/images/arrow-3-small.png';
import {useWindowWidth} from "../../utils/useWindowWidth";
import {MEDIUM_SCREEN} from "../../constants/screenSizes";
const ExampleSection = () => {
  const windowWidth = useWindowWidth()

  const renderDesktopContent = () => (
    <>
      <div className='absolute top-40 left-10 z-10'>
        <h2 className='text-black text-[44px] sm:text-5xl sm:text-center font-bold leading-tight'>
          Ovo smo mi opisali
        </h2>
        <img src={imgArrow1} className='z-20 absolute h-[160px] lg:h-[200px] xl:h-[270px] lg:left-[30px] xl:left-[35px]' />
        <div className='flex justify-center items-center p-2 rounded-md text-[28px] absolute w-[300px] h-[100px] bg-white top-[150px] lg:top-[190px] xl:top-[250px] left-[130px] lg:left-[190px] xl:left-[260px]'>
          "Pomeranac vija hranu u svemiru"
        </div>
        <img src={imgArrow2} className='z-20 absolute h-[70px] lg:h-[80px] xl:h-[100px] top-[260px] lg:top-[310px] xl:top-[340px] left-[200px] lg:left-[230px] xl:left-[490px]' />
        <div className='flex items-center clip-angled-edges p-2 pl-3 text-[28px] absolute w-[210px] text-white h-[40px] bg-nsm-orange top-[300px] lg:top-[360px] xl:top-[400px] left-[350px] lg:left-[400px] xl:left-[700px]'>
          Ovo smo dobili
        </div>
        <img src={imgArrow3} className='z-20 absolute h-[25px] lg:h-[30px] xl:h-[40px] top-[300px] lg:top-[360px] xl:top-[380px] left-[560px] lg:left-[610px] xl:left-[910px]' />
      </div>
      <img src={imgTShirtPomeranian} className={'absolute bottom-0 right-2 lg:right-4 xl:right-10 sm:h-[400px] lg:h-[500px] xl:h-[650px]'} />
    </>
  )

  const renderMobileContent = () => (
    <div>
      <div className='absolute top-20 px-4 z-10'>
        <h2 className='text-black text-[44px] font-bold leading-tight'>
          Ovo smo mi opisali
        </h2>
        <img src={imgArrow1Small} className='absolute h-[120px] top-[40px] left-[280px] z-20' />
        <div className='flex justify-center items-center rounded-md absolute top-[170px] right-[40px] w-[280px] h-[80px] bg-white text-[24px] p-2'>
          "Pomeranac vija hranu u svemiru"
        </div>
        <img src={imgArrow2Small} className='absolute h-[100px] left-[120px] top-[260px] z-20' />
        <div className='flex justify-center items-center clip-angled-edges absolute w-[190px] h-[40px] bg-nsm-orange top-[360px] left-[100px] text-[24px] text-white'>
          Ovo smo dobili
        </div>
        <img src={imgArrow3Small} className='absolute h-[80px] top-[400px] left-[140px] z-20' />
      </div>
      <div className='flex justify-center w-full h-[320px] absolute bottom-0'>
        <img src={imgTShirtPomeranian} className={'h-[320px]'} />
      </div>
    </div>
  )

  return (
    <div className='relative flex w-full h-screen bg-nsm-gray-100'>
      {windowWidth > MEDIUM_SCREEN ? renderDesktopContent() : renderMobileContent()}
    </div>
  );
};

export default ExampleSection;
