import React, { useEffect, useState } from 'react'
import { generateImage } from '../api/imageGenerator'
import socketIOClient from 'socket.io-client'
import Container from '../components/shared/Container'
import Button from '../components/shared/Button'

type ClothesGeneratorTypes = {
  userId: string
}
const ClothesGenerator = ({ userId }: ClothesGeneratorTypes) => {
  const [description, setDescription] = useState('')
  const [isGeneratingImages, setIsGeneratingImages] = useState(false)
  const [generatedImages, setGeneratedImages] = useState([])
  const [focusedPhotoIndex, setFocusedPhotoIndex] = useState(0)

  useEffect(() => {
    const baseApiUrl = process.env.REACT_APP_BASE_API_URL|| ''
    const socket = socketIOClient(baseApiUrl)

    console.log(`Listening generated images for ${userId}`)
    socket.on(`generatedImages${userId}`, (data) => {
      setGeneratedImages(data)
      setIsGeneratingImages(false)
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleGenerateImage = () => {
    setIsGeneratingImages(true)
    generateImage(description, userId)
  }

  const renderPreviewImage = (imageUrl: string, index: number) => (
    <div
      key={index}
      className={`flex items-center justify-center border cursor-pointer
      ${index === focusedPhotoIndex ? 'border-light-blue border-2' : 'border-gray-200'} h-16 w-16 mx-2 rounded-md`}
      onClick={() => setFocusedPhotoIndex(index)}
    >
      <img
        width={50}
        height={50}
        src={imageUrl}
        className='rounded-md'
      />
    </div>
  )

  const renderEmptyPreviewImage = (index: number) => (
    <div
      key={index}
      className={`flex items-center justify-center border cursor-pointer border-gray-200 h-16 w-16 mx-2 rounded-md ${isGeneratingImages && gradientBgLoaderStyle}`}
    />
  )

  const gradientBgLoaderStyle = 'bg-gradient-to-r from-very-light-blue via-very-light-blue to-white background-animate'
  return (
    <Container>
      <div className='flex w-full flex-col lg:flex-row mb-10'>
        <div className='flex flex-col w-full lg:w-[50%]'>
          <h3 className='font-bold text-xl mt-10 mb-4'>Polje za tekst</h3>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className='w-full h-[372px] border border-gray-200 rounded-md focus:outline-none p-4'
          />
          <br />
          <Button
            isMain={false}
            text={'Napravi sliku za majicu'}
            onClick={handleGenerateImage}
            customStyles={'w-full'}
            isDisabled={isGeneratingImages}
            disabledText={'Slike se generišu...'}
          />
        </div>

        <div className='flex flex-col w-full mt-4 lg:w-[50%] lg:items-end lg:mt-0'>
          <h3 className='font-bold text-xl mt-10 mb-4'>Boje</h3>
          <div className='flex items-center justify-center w-full lg:w-[80%] h-[300px] border border-gray-200 rounded-md'>
            {generatedImages && generatedImages.length > 0 ? (
              <img
                width={200}
                height={200}
                src={generatedImages[focusedPhotoIndex]}
              />
            ) : (
              <div className={`text-gray-400 font-bold flex justify-center items-center rounded-md h-full w-full`}>
                <div className={`w-[140px] h-[240px] ${isGeneratingImages ? gradientBgLoaderStyle : 'bg-gray-200'}`} />
                <div className={`absolute rounded-md p-4 shadow bg-white cursor-default w-[250px] text-center mb-16`}>
                  {isGeneratingImages ?
                    'Generisana majica će se pojaviti ovde'
                    : 'U polju levo opiši sliku koju želiš da vidiš ovde na majici'
                  }
                </div>
              </div>
            )}
          </div>
          <div className='flex items-center justify-center w-full lg:w-[80%] mt-2'>
            {generatedImages.length > 0 ? (
              generatedImages.map((imageUrl, index) => {
                return renderPreviewImage(imageUrl, index)
              })
            ) : (
              Array.from({ length: 4 }).map((_, index) => {
                return renderEmptyPreviewImage(index)
              })
            )}
          </div>
          <div className='flex items-center justify-center w-full lg:w-[80%] mt-7'>
            <Button
              isMain
              text={'Poruči ovu majicu'}
              onClick={() => console.log('Poruci')}
              customStyles={'w-full'}
              isDisabled={generatedImages.length === 0}
              disabledText={'Poruči ovu majicu'}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ClothesGenerator