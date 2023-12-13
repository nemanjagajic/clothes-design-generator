import React, { useEffect, useState } from 'react'
import { generateImage } from '../../api/imageGenerator'
import socketIOClient from 'socket.io-client'
import Container from '../../components/shared/Container'
import Button from '../../components/shared/Button'
import axios from "axios";

const PROGRESS_BAR_FETCHING_INTERVAL_MS = 3000
const DEFAULT_PROGRESS_INCREMENT = 2

type ClothesGeneratorTypes = {
  userId: string
}
const ClothesGenerator = ({ userId }: ClothesGeneratorTypes) => {
  const [description, setDescription] = useState('')
  const [isGeneratingImages, setIsGeneratingImages] = useState(false)
  const [generatedImages, setGeneratedImages] = useState([])
  const [focusedPhotoIndex, setFocusedPhotoIndex] = useState(0)
  const [progressBarPercentage, setProgressBarPercentage] = useState(0)

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

  const getRandomOneTwoOrThree = () => {
    const randomDecimal = Math.random()

    if (randomDecimal < 0.3333) {
      return 1
    } else if (randomDecimal < 0.6666) {
      return 2
    } else {
      return 3
    }
  }

  const fetchAndUpdateProgress = async () => {
    try {
      const {data: {progress}} = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/getImageGenerationProgress`)
      if (progress < progressBarPercentage && progressBarPercentage > DEFAULT_PROGRESS_INCREMENT) return
      if (progress === 0) {
        const randomIncrement = getRandomOneTwoOrThree()
        console.log('random increment: ', randomIncrement)
        setProgressBarPercentage(prevProgress => prevProgress + randomIncrement)
        return
      }
      setProgressBarPercentage(progress)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (!isGeneratingImages) return
    const interval = setInterval(() => {
      fetchAndUpdateProgress()
    }, PROGRESS_BAR_FETCHING_INTERVAL_MS)
    setTimeout(() => {
      if (progressBarPercentage === 0) setProgressBarPercentage(DEFAULT_PROGRESS_INCREMENT)
    }, 1000)

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isGeneratingImages])

  const handleGenerateImage = () => {
    setGeneratedImages([])
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
        <div className='flex flex-col w-full lg:w-[40%]'>
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
            isDisabled={isGeneratingImages || !description}
            disabledText={description ? 'Slike se generišu...' : 'Napravi sliku za majicu'}
          />
        </div>

        <div className='flex flex-col w-full mt-4 lg:w-[60%] lg:items-end lg:mt-0'>
          <h3 className='font-bold text-xl mt-10 mb-4'>Boje</h3>
          <div className='flex items-center justify-center w-full lg:w-[80%] h-[300px] border border-gray-200 rounded-md'>
            {generatedImages && generatedImages.length > 0 ? (
              <img
                width={200}
                height={200}
                src={generatedImages[focusedPhotoIndex]}
              />
            ) : (
              <div className={`text-gray-400 font-bold flex justify-center items-center rounded-md h-full w-full relative overflow-hidden`}>
                <div className={`w-[140px] h-[240px] ${isGeneratingImages ? gradientBgLoaderStyle : 'bg-gray-200'}`} />
                {isGeneratingImages && (
                  <div className="w-full bg-gray-200 h-2.5 dark:bg-gray-100 absolute bottom-0 rounded-b-md">
                    <div className="bg-light-blue h-2.5 rounded-full" style={{ width: `${progressBarPercentage}%`, transition: 'width 0.3s ease' }}></div>
                  </div>
                )}
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