import React from 'react';

// @ts-ignore
import imgTShirtPomeranian from '../../assets/images/t-shirt-pomeranian-example.png';
// @ts-ignore
import imgArrow1 from '../../assets/images/arrow-1.png';
// @ts-ignore
import imgArrow2 from '../../assets/images/arrow-2.png';
// @ts-ignore
import imgArrow3 from '../../assets/images/arrow-3.png';
const ExampleSection = () => {
  return (
    <div className='relative flex w-full h-screen bg-nsm-gray-100'>
      <div className='absolute top-40 left-10 z-10'>
        <h2 className='text-black text-[44px] sm:text-5xl sm:text-center font-bold leading-tight'>
          Ovo smo mi opisali
        </h2>
        <img src={imgArrow1} className='absolute h-[160px] lg:h-[200px] xl:h-[270px] lg:left-[30px] xl:left-[35px]' />
        <div className='absolute w-[300px] h-[100px] bg-white top-[150px] lg:top-[190px] xl:top-[250px] left-[130px] lg:left-[190px] xl:left-[260px]' />
        <img src={imgArrow2} className='absolute h-[70px] lg:h-[80px] xl:h-[100px] top-[260px] lg:top-[310px] xl:top-[340px] left-[200px] lg:left-[230px] xl:left-[490px]' />
        <div className='absolute w-[200px] h-[40px] bg-nsm-orange top-[300px] lg:top-[360px] xl:top-[400px] left-[350px] lg:left-[400px] xl:left-[700px]' />
        <img src={imgArrow3} className='absolute h-[25px] lg:h-[30px] xl:h-[40px] top-[300px] lg:top-[360px] xl:top-[380px] left-[560px] lg:left-[610px] xl:left-[910px]' />
      </div>
      <img src={imgTShirtPomeranian} className={'absolute bottom-0 right-2 lg:right-4 xl:right-10 sm:h-[400px] lg:h-[500px] xl:h-[650px]'} />
    </div>
  );
};

export default ExampleSection;
