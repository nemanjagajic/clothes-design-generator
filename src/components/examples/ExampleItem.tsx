import React from 'react'
import Button from '../shared/Button'

const ExampleItem = () => {
  return (
    <div className='m-auto mb-12'>
      <img alt='example-image' className='m-auto' height={200} width={200} src="http://placekitten.com/g/400/200" />
      <div className='m-auto w-[70%] text-gray-500 my-4'>"Neki tekst ide ovde da opise sta se nalazi kao upit na majici"</div>
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