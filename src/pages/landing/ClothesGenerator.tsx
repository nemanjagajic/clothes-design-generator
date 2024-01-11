import React, { useEffect, useState } from 'react'
import { generateImage } from '../../api/imageGenerator'
import Container from '../../components/shared/Container'
import Button from '../../components/shared/Button'
import axios from 'axios'
import ColorPicker from '../../components/shared/ColorPicker'
import { Item, useItems } from '../../store/ItemsContext'
import TShirtSizeDropdown from '../../components/shared/TShirtSizeDropdown'
import EmailCard from '../../components/EmailCard/EmailCard'
import { useSearchParams } from 'react-router-dom'
// @ts-ignore
import blackTShirt from '../../assets/images/black-tshirt.png'
import { Close } from "react-ionicons";
import GenderRadioButtons from './GenderRadioButtons'
import { checkIfElementIsInViewPort, scrollToSection } from "../../utils/pageNavigation";

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
  const [isSelectedImagePreviewModalOpen, setIsSelectedImagePreviewModalOpen] = useState(false)

  const [searchParams] = useSearchParams()

  useEffect(() => {
    if (generatedImages.length)
      localStorage.setItem("images", JSON.stringify(generatedImages))
  }, [generatedImages])

  useEffect(() => {
    const img0 = decodeURIComponent(searchParams.get('img0')!)
    const img1 = decodeURIComponent(searchParams.get('img1')!)
    const img2 = decodeURIComponent(searchParams.get('img2')!)
    const img3 = decodeURIComponent(searchParams.get('img3')!)

    if (img0 !== 'null') {
      setGeneratedImages([img0, img1, img2, img3])
      return
    }

    try {
      const imagesFromStorage = localStorage.getItem("images")
      if (imagesFromStorage) {
        setGeneratedImages(JSON.parse(imagesFromStorage))
      }

    } catch (error) {

    }
  }, [])
  const { updateCurrentItem, addToCart, currentItem } = useItems()

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
        data: { progress, response },
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
      if (progress === 100) {
        setGeneratedImages(response.imageUrls)
        setIsGeneratingImages(false)
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

  useEffect(() => {
    toggleBodyScroll(!isSelectedImagePreviewModalOpen)
    return () => toggleBodyScroll(true)
  }, [isSelectedImagePreviewModalOpen])

  const toggleBodyScroll = (shouldEnable: boolean) => {
    document.body.style.overflow = shouldEnable ? 'auto' : 'hidden'
  }

  const clearGeneratedImages = () => {
    setGeneratedImages([])
    setProgressBarPercentage(0)
    setMyIndexInGenerationQueue(null)
  }

  const handleGenerateImage = () => {
    clearGeneratedImages()
    setIsGeneratingImages(true)
    generateImage(description, userId)
    scrollToTShirtContainer()
  }

  const scrollToTShirtContainer = () => {
    setTimeout(() => {
      const tShirtContainerDiv = document.getElementById('t-shirt-container')
      if (tShirtContainerDiv && !checkIfElementIsInViewPort(tShirtContainerDiv)) {
        scrollToSection('t-shirt-container')
      }
    }, 0)
  }

  const renderPreviewImage = (imageUrl: string, index: number) => (
    <div
      key={index}
      className={`flex items-center justify-center border cursor-pointer w-[140px] h-auto min-h-[120px] min-w-[120px]
      ${index === focusedPhotoIndex
          ? 'border-light-blue border-2'
          : 'border-white border-2'
        } h-[140px] w-[140px] mx-2 rounded-lg`}
      onClick={() => setFocusedPhotoIndex(index)}
    >
      <img src={imageUrl} className='rounded-md' />
    </div>
  )

  const renderEmptyPreviewImage = (index: number) => (
    <div
      key={index}
      className={`flex items-center justify-center border cursor-pointer border-gray-200 min-h-[120px] min-w-[120px] mx-2 rounded-md ${isGeneratingImages && gradientBgLoaderStyle
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
      <div className='flex w-full flex-col xl:flex-row mb-10'>
        <div className='flex flex-col w-full xl:w-[40%]'>
          <h3 className='font-bold text-xl mt-10 mb-3'>Polje za tekst</h3>
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
        <div className='flex flex-col w-full mt-4 xl:w-[60%] xl:items-end xl:mt-4'>
          <div className='flex items-start justify-between xl:w-[90%] md:w-[100%] flex-col md:flex-row md:items-center'>
            <div className='flex justify-center items-center'>
              <h3 className='font-bold text-xl mr-4'>Boja</h3>
              <ColorPicker onColorPick={updateColor} />
            </div>
            <div className="flex justify-center items-center lg:mx-2">
              <h3 className='font-bold text-xl mr-4'>Pol</h3>
              <GenderRadioButtons onChange={(gender) => updateCurrentItem({ gender })} />
            </div>
            <div className='flex-row mt-4 md:mt-0 '>
              <TShirtSizeDropdown onSizeChange={updateSize} />
            </div>
          </div>

          <div id='t-shirt-container' className='flex items-center justify-center w-full xl:w-[90%] border border-gray-200 rounded-md shadow-md pt-4'>
            {generatedImages && generatedImages.length > 0 ? (
              <>
                <img width={400} src={blackTShirt} className="px-2 mb-8" />
                <img
                  className='w-[120px] h-[120px] sm:w-[170px] sm:h-[170px] absolute mb-32 sm:mb-40 mr-1 sm:mr-2 rounded-md cursor-pointer'
                  onClick={() => setIsSelectedImagePreviewModalOpen(true)}
                  width={170}
                  src={generatedImages[focusedPhotoIndex]}
                />
              </>
            ) : (
              <div
                className={`text-gray-400 font-bold flex justify-center items-center rounded-md h-full w-full relative overflow-hidden`}
              >
                <img width={400} src={blackTShirt} className="px-2 mb-8" />
                <div
                  className={`flex items-center justify-center w-[120px] h-[120px] sm:w-[170px] sm:h-[170px] absolute mb-32 sm:mb-40 mr-1 sm:mr-2 rounded-md ${isGeneratingImages ? 'bg-gray-transparent' : 'bg-gray-200'
                    }`}
                >
                  {isGeneratingImages && (
                    <div className="loader w-[120px] h-[120px] sm:w-[170px] sm:h-[170px]">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  )}
                </div>
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
                      <>
                        <div className='mb-2 m-auto flex items-center justify-center'>
                          <div className='font-normal text-light-blue'>
                            {progressBarPercentage}%
                          </div>
                        </div>
                        <div className='w-full bg-gray-200 h-2.5 dark:bg-gray-100 absolute bottom-0 rounded-b-md'>
                          <div
                            className='bg-light-blue h-2.5 rounded-full'
                            style={{
                              width: `${progressBarPercentage}%`,
                              transition: 'width 0.3s ease',
                            }}
                          ></div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className='flex items-center md:justify-center w-full xl:w-[90%] mt-2 overflow-x-auto pb-3'>
            {generatedImages.length > 0
              ? generatedImages.map((imageUrl, index) => {
                return renderPreviewImage(imageUrl, index)
              })
              : Array.from({ length: 4 }).map((_, index) => {
                return renderEmptyPreviewImage(index)
              })}
          </div>
          <div className='flex items-center justify-center w-full xl:w-[90%] mt-5'>
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
        {isSelectedImagePreviewModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-30 overflow-auto">
            <div className="relative">
              <img
                src={generatedImages[focusedPhotoIndex]}
                alt="Full view"
                className="object-contain mx-auto my-0"
                style={{ maxHeight: 'calc(100vh - 2rem)' }}
              />
              <div onClick={() => setIsSelectedImagePreviewModalOpen(false)} className="absolute top-0 right-0 p-2 z-40 bg-gray-900 cursor-pointer">
                <Close height='30px' width='30px' color='#fff' />
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}

export default ClothesGenerator
