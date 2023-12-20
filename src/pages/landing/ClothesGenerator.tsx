import React, { useEffect, useState } from 'react'
import { generateImage } from '../../api/imageGenerator'
import socketIOClient from 'socket.io-client'
import Container from '../../components/shared/Container'
import Button from '../../components/shared/Button'
import axios from 'axios'
import ColorPicker from '../../components/shared/ColorPicker'
import { Item, useItems } from '../../store/ItemsContext'
import TShirtSizeDropdown from '../../components/shared/TShirtSizeDropdown'
import EmailCard from '../../components/EmailCard/EmailCard'
import { useSearchParams } from 'react-router-dom'

const PROGRESS_BAR_FETCHING_INTERVAL_MS = 5000
const DEFAULT_PROGRESS_INCREMENT = 2
const QUEUE_FETCHING_INTERVAL_MS = 5000

type ClothesGeneratorTypes = {
  userId: string
}
const ClothesGenerator = ({ userId }: ClothesGeneratorTypes) => {
  const [description, setDescription] = useState('')
  const [isGeneratingImages, setIsGeneratingImages] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [focusedPhotoIndex, setFocusedPhotoIndex] = useState(0)
  const [progressBarPercentage, setProgressBarPercentage] = useState(0)
  const [myIndexInGenerationQueue, setMyIndexInGenerationQueue] = useState(null)

  const [searchParams] = useSearchParams()

  useEffect(() => {
    const img0 = decodeURIComponent(searchParams.get('img0')!)
    const img1 = decodeURIComponent(searchParams.get('img1')!)
    const img2 = decodeURIComponent(searchParams.get('img2')!)
    const img3 = decodeURIComponent(searchParams.get('img3')!)

    if (img0) {
      setGeneratedImages([img0, img1, img2, img3])
    }
  }, [])
  const { updateCurrentItem, addToCart, currentItem } = useItems()

  useEffect(() => {
    const baseApiUrl = process.env.REACT_APP_BASE_API_URL || ''
    const socket = socketIOClient(baseApiUrl)

    console.log(`Listening generated images for ${userId}`)
    socket.on(`generatedImages${userId}`, (data) => {
      setGeneratedImages(data)
      setIsGeneratingImages(false)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    updateCurrentItem({ imageUrl: generatedImages[focusedPhotoIndex] })
  }, [generatedImages, focusedPhotoIndex])

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
      const {
        data: { progress },
      } = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/getImageGenerationProgress`
      )
      if (progress === 0) {
        const randomIncrement = getRandomOneTwoOrThree()
        setProgressBarPercentage(
          (prevProgress) => prevProgress + randomIncrement
        )
        return
      }
      if (progress > 0) {
        setProgressBarPercentage(progress)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const fetchGenerationQueueData = async () => {
    try {
      const {
        data: { imageRequestsQueue },
      } = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/imageRequestsQueue`
      )
      const myGenerationIndex = imageRequestsQueue.findIndex(
        (ir: any) => ir.ref === userId
      )
      setMyIndexInGenerationQueue(myGenerationIndex)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (!isGeneratingImages || myIndexInGenerationQueue !== 0) return
    const interval = setInterval(() => {
      fetchAndUpdateProgress()
    }, PROGRESS_BAR_FETCHING_INTERVAL_MS)
    setTimeout(() => {
      if (progressBarPercentage === 0)
        setProgressBarPercentage(DEFAULT_PROGRESS_INCREMENT)
    }, 1000)

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isGeneratingImages, myIndexInGenerationQueue])

  useEffect(() => {
    if (!isGeneratingImages || myIndexInGenerationQueue === 0) return
    const interval = setInterval(() => {
      fetchGenerationQueueData()
    }, QUEUE_FETCHING_INTERVAL_MS)

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isGeneratingImages, myIndexInGenerationQueue])

  const clearGeneratedImages = () => {
    setGeneratedImages([])
    setProgressBarPercentage(0)
    setMyIndexInGenerationQueue(null)
  }

  const handleGenerateImage = () => {
    clearGeneratedImages()
    setIsGeneratingImages(true)
    generateImage(description, userId)
  }

  const renderPreviewImage = (imageUrl: string, index: number) => (
    <div
      key={index}
      className={`flex items-center justify-center border cursor-pointer shadow-md w-[140px] h-auto
      ${
        index === focusedPhotoIndex
          ? 'border-light-blue border-2'
          : 'border-gray-200'
      } h-[140px] w-[140px] mx-2 rounded-md`}
      onClick={() => setFocusedPhotoIndex(index)}
    >
      <img src={imageUrl} className='rounded-md' />
    </div>
  )

  const renderEmptyPreviewImage = (index: number) => (
    <div
      key={index}
      className={`flex items-center justify-center border cursor-pointer border-gray-200 h-[140px] w-[140px] mx-2 rounded-md shadow-md ${
        isGeneratingImages && gradientBgLoaderStyle
      }`}
    />
  )

  const updateColor = (color: Item['color']) => {
    updateCurrentItem({ color })
  }

  const updateSize = (size: Item['size']) => {
    updateCurrentItem({ size })
  }

  const gradientBgLoaderStyle =
    'bg-gradient-to-r from-very-light-blue via-very-light-blue to-white background-animate'
  return (
    <Container>
      <div className='flex w-full flex-col lg:flex-row mb-10'>
        <div className='flex flex-col w-full lg:w-[40%]'>
          <h3 className='font-bold text-xl mt-10 mb-4'>Polje za tekst</h3>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='w-full h-[150px] border border-gray-200 rounded-md focus:outline-none p-4 shadow-md'
          />
          <br />
          <Button
            isMain={false}
            text={'Napravi sliku za majicu'}
            onClick={handleGenerateImage}
            customStyles={'w-full'}
            isDisabled={isGeneratingImages || !description.trim()}
            disabledText={
              isGeneratingImages
                ? 'Slike se generišu...'
                : 'Napravi sliku za majicu'
            }
          />

          {!!isGeneratingImages && <EmailCard userId={userId} />}
        </div>
        <div className='flex flex-col w-full mt-4 lg:w-[60%] lg:items-end lg:mt-4'>
          <div className='flex items-center justify-between w-[80%]'>
            <div className='flex justify-center items-center'>
              <h3 className='font-bold text-xl mr-4'>Boja</h3>
              <ColorPicker onColorPick={updateColor} />
            </div>
            <div className='flex-row'>
              <TShirtSizeDropdown onSizeChange={updateSize} />
            </div>
          </div>

          <div className='flex items-center justify-center w-full lg:w-[80%] h-[500px] border border-gray-200 rounded-md shadow-md'>
            {generatedImages && generatedImages.length > 0 ? (
              <img
                className='w-[80%]'
                src={generatedImages[focusedPhotoIndex]}
              />
            ) : (
              <div
                className={`text-gray-400 font-bold flex justify-center items-center rounded-md h-full w-full relative overflow-hidden`}
              >
                <div
                  className={`w-[400px] h-[400px] ${
                    isGeneratingImages ? gradientBgLoaderStyle : 'bg-gray-200'
                  }`}
                />
                {isGeneratingImages && (
                  <div className='w-full absolute bottom-0'>
                    {!!myIndexInGenerationQueue &&
                    myIndexInGenerationQueue > 0 ? (
                      <div>
                        <div className='text-center py-1 text-sm'>
                          {`Trenutno ${myIndexInGenerationQueue} ljudi kreira svoju majicu`}
                        </div>
                      </div>
                    ) : (
                      <div className='w-full bg-gray-200 h-2.5 dark:bg-gray-100 absolute bottom-0 rounded-b-md'>
                        <div
                          className='bg-light-blue h-2.5 rounded-full'
                          style={{
                            width: `${progressBarPercentage}%`,
                            transition: 'width 0.3s ease',
                          }}
                        ></div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className='flex items-center justify-center w-full lg:w-[80%] mt-2'>
            {generatedImages.length > 0
              ? generatedImages.map((imageUrl, index) => {
                  return renderPreviewImage(imageUrl, index)
                })
              : Array.from({ length: 4 }).map((_, index) => {
                  return renderEmptyPreviewImage(index)
                })}
          </div>
          <div className='flex items-center justify-center w-full lg:w-[80%] mt-7'>
            <Button
              isMain
              text={'Dodaj u korpu'}
              onClick={() => addToCart(currentItem)}
              customStyles={'w-full'}
              isDisabled={generatedImages.length === 0}
              disabledText={'Dodaj u korpu'}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ClothesGenerator
