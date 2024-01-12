import React from 'react';

// @ts-ignore
import imgTShirtPomeranian from '../../assets/images/t-shirt-pomeranian-example.png';
const ExampleSection = () => {
  return (
    <div className='relative flex w-full h-screen bg-nsm-gray-100'>
      <h2 className='absolute top-40 left-10 text-black text-[44px] sm:text-5xl sm:text-center font-bold leading-tight pb-10'>
        Ovo smo mi opisali
      </h2>
      <img src={imgTShirtPomeranian} className={'absolute bottom-0 right-10 h-[650px]'} />
    </div>
  );
};

export default ExampleSection;
