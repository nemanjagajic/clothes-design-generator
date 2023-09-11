import React, { useEffect, useState } from 'react'
import { generateImage } from '../api/imageGenerator'
import socketIOClient from 'socket.io-client'
import Container from '../components/shared/Container'

const ClothesGenerator = () => {
  const [description, setDescription] = useState('')
  const [isGeneratingImages, setIsGeneratingImages] = useState(false)
  const [generatedImages, setGeneratedImages] = useState([])
  const [focusedPhotoIndex, setFocusedPhotoIndex] = useState(0)

  useEffect(() => {
    const baseApiUrl = process.env.REACT_APP_BASE_API_URL|| ''
    const socket = socketIOClient(baseApiUrl)

    socket.on('generatedImages', (data) => {
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
          <button onClick={handleGenerateImage} disabled={isGeneratingImages}>Generate images</button>
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
            {generatedImages.map((imageUrl, index) => {
              return renderPreviewImage(imageUrl, index)
            })}
            {isGeneratingImages && (
              <div>Your images are being generated and will appear here, this can take up to a minute...</div>
            )}
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ClothesGenerator