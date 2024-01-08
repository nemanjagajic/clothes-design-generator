import React from 'react'
import Button from '../shared/Button'
// @ts-ignore
import blackTShirt from "../../assets/images/black-tshirt.png"
const ExampleItem = ({ imgSrc, description }: { imgSrc: string, description: string}) => {
  return (
    <div className='m-auto mb-12'>
      <div className='flex items-center justify-center'>
        <img alt='example-image' width={400} src={blackTShirt} />
        <img
          src={imgSrc}
          alt='generated-image'
          className={`w-[120px] h-[120px] xl:w-[150px] xl:h-[150px] absolute mb-28 mr-2 rounded-md`}
        />
      </div>
      <div className='m-auto w-[70%] text-gray-500 mt-4 mb-10 h-12'>
        "<span>{description}</span>"
      </div>
      <div className={'m-auto w-[80%]'}>
        <Button
          isMain={false}
          text={'Napravi sliku za majicu'}
          onClick={() => console.log('odabrano')}
          customStyles={'w-full py-2'}
        />
      </div>
    </div>
  )
}

export default ExampleItem
