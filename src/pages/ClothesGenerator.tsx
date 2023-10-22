import React, { useEffect, useState } from 'react'
import { generateImage } from '../api/imageGenerator'
import socketIOClient from 'socket.io-client'
import Container from '../components/shared/Container'
import Button from '../components/shared/Button'

const ClothesGenerator = () => {
  const [description, setDescription] = useState('')
  const [isGeneratingImages, setIsGeneratingImages] = useState(false)
  const [generatedImages, setGeneratedImages] = useState([])
  const [focusedPhotoIndex, setFocusedPhotoIndex] = useState(0)

  useEffect(() => {
    const baseApiUrl = process.env.REACT_APP_BASE_API_URL|| ''
    const socket = socketIOClient(baseApiUrl)

    const userId = localStorage.getItem('userId')
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
    generateImage(description)
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
      className={`flex items-center justify-center border cursor-pointer border-gray-200 h-16 w-16 mx-2 rounded-md`}
    />
  )

  return (
    <Container>
      <div className='flex w-full flex-row mb-10'>
        <div className='flex flex-col w-[50%]'>
          <h3 className='font-bold text-xl mt-10 mb-4'>Polje za tekst</h3>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className='w-full h-[372px] border border-gray-200 rounded-md focus:outline-none p-4'
          />
          <br />
          {isGeneratingImages ? (
            <div>Slike se generišu...</div>
          ) : (
            <Button
              isMain={false}
              text={'Napravi sliku za majicu'}
              onClick={handleGenerateImage}
              customStyles={'w-full'}
            />
          )}
        </div>

        <div className='flex flex-col items-end w-[50%]'>
          <h3 className='font-bold text-xl mt-10 mb-4'>Boje</h3>
          <div className='flex items-center justify-center w-[80%] h-[300px] border border-gray-200 rounded-md'>
            {generatedImages && generatedImages.length > 0 ? (
              <img
                width={200}
                height={200}
                src={generatedImages[focusedPhotoIndex]}
              />
            ) : (
              <div>Generisana majica će se pojaviti ovde</div>
            )}
          </div>
          <div className='flex items-center justify-center w-[80%] mt-2'>
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
          <div className='flex items-center justify-center w-[80%] mt-7'>
            <Button
              isMain
              text={'Poruči ovu majicu'}
              onClick={() => console.log('Poruci')}
              customStyles={'w-full'}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ClothesGenerator