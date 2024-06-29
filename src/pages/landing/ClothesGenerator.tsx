import React, { useEffect, useRef, useState } from 'react'
import toastr from 'toastr'
import { generateImage } from '../../api/imageGenerator'
import Button from '../../components/shared/Button'
import axios from 'axios'
import ColorPicker from '../../components/shared/ColorPicker'
import { Item, useItems } from '../../store/ItemsContext'
import { useSearchParams } from 'react-router-dom'
// @ts-ignore
import blackTShirt from '../../assets/shirts/black.png'
// @ts-ignore
import oliveTShirt from '../../assets/shirts/green.png'
// @ts-ignore
import redTShirt from '../../assets/shirts/red.png'
// @ts-ignore
import whiteTShirt from '../../assets/shirts/white.png'
// @ts-ignore
import grayTShirt from '../../assets/shirts/gray.png'
// @ts-ignore
import lightGrayTShirt from '../../assets/shirts/lightgray.png'
// @ts-ignore
import yellowTShirt from '../../assets/shirts/yellow.png'
// @ts-ignore
import pinkTShirt from '../../assets/shirts/pink.png'
// @ts-ignore
import blueTShirt from '../../assets/shirts/blue.png'


// @ts-ignore
import blackTShirtF from '../../assets/shirts/black_f.png'
// @ts-ignore
import oliveTShirtF from '../../assets/shirts/green_f.png'
// @ts-ignore
import redTShirtF from '../../assets/shirts/red_f.png'
// @ts-ignore
import whiteTShirtF from '../../assets/shirts/white_f.png'
// @ts-ignore
import grayTShirtF from '../../assets/shirts/gray_f.png'
// @ts-ignore
import lightGrayTShirtF from '../../assets/shirts/lightgray_f.png'
// @ts-ignore
import yellowTShirtF from '../../assets/shirts/yellow_f.png'
// @ts-ignore
import pinkTShirtF from '../../assets/shirts/pink_f.png'
// @ts-ignore
import blueTShirtF from '../../assets/shirts/blue_f.png'


import { InformationCircleOutline } from 'react-ionicons'

import { Close } from 'react-ionicons'
import GenderRadioButtons from './GenderRadioButtons'
import {
  checkIfElementIsInViewPort,
  scrollToSection,
} from '../../utils/pageNavigation'
import TShirtSizeSelector from '../../components/shared/TShirtSizeSelector'
import { useWindowWidth } from '../../utils/useWindowWidth'
import { EXTRA_LARGE_SCREEN } from '../../constants/screenSizes'
import GeneratorForm from './GeneratorForm'
import { useHistory } from '../../components/history/HistoryContext'
import ErrorPage from '../error/ErrorPage'
import { sliceImageIntoUrls } from '../../utils/imageSlicer'

const PROGRESS_BAR_FETCHING_INTERVAL_MS = 5000
const DEFAULT_PROGRESS_INCREMENT = 2

const TSHIRTS: { [color: string]: string } = {
  black: blackTShirt,
  green: oliveTShirt,
  red: redTShirt,
  white: whiteTShirt,
  gray: grayTShirt,
  pink: pinkTShirt,
  blue: blueTShirt,
  lightGray: lightGrayTShirt,
  yellow: yellowTShirt
}

const TSHIRTS_F: { [color: string]: string } = {
  black: blackTShirtF,
  green: oliveTShirtF,
  red: redTShirtF,
  white: whiteTShirtF,
  gray: grayTShirtF,
  pink: pinkTShirtF,
  blue: blueTShirtF,
  lightGray: lightGrayTShirtF,
  yellow: yellowTShirtF,
}



type ClothesGeneratorTypes = {
  imgGenerationRef: string
  onHistoryClicked?: (() => void) | null
}

const ClothesGenerator = ({
  imgGenerationRef,
  onHistoryClicked,
}: ClothesGeneratorTypes) => {
  const [showBadWord, setShowBadWord] = useState(false)
  const [isBadPrompt, setIsBadPrompt] = useState(false)
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null)

  const [isGeneratingImages, setIsGeneratingImages] = useState(false)
  const [focusedPhotoIndex, setFocusedPhotoIndex] = useState(0)
  const [isSelectedImagePreviewModalOpen, setIsSelectedImagePreviewModalOpen] =
    useState(false)
  const [currentGenerationImageId, setCurrentGenerationImageId] = useState('')
  const { currentImages, updateCurrentImages, setCurrentImages } = useHistory()
  const [progressBarPercentage, setProgressBarPercentage] = useState(0)

  const [searchParams] = useSearchParams()

  const windowWidth = useWindowWidth()

  const promptRef = useRef('')

  const inputRef = useRef<HTMLTextAreaElement | null>(null)
  const { addHistoryItem } = useHistory()

  useEffect(() => {
    const imgUrl = decodeURIComponent(searchParams.get('imgUrl')!)
    
    if (imgUrl !== 'null') {
      updateCurrentImages(imgUrl)
      return
    }

    try {
      const imageFromStorage = localStorage.getItem('mainImage')

      if (imageFromStorage) {
        sliceImageIntoUrls(imageFromStorage).then(urls => {
          setCurrentImages(urls)
        })
      }
    } catch (error) {
    }
  }, [])

  const { updateCurrentItem, addToCart, currentItem, userId } = useItems()

  useEffect(() => {
    updateCurrentItem({ imageUrl: currentImages[focusedPhotoIndex], mainImageUrl: localStorage.getItem('mainImage'), imageIndex: focusedPhotoIndex + 1 })
  }, [currentImages, focusedPhotoIndex])

  const fakeProgress = () => {
    return Math.floor(Math.random() * 3) * 5
  }

  const handleAddToCart = () => {
    toastr.success('Majica vas čeka u korpi 👕', 'Dodato! 🎉', {
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
    })
    addToCart(currentItem)
  }

  const fetchAndUpdateProgress = async () => {
    try {
      if (currentGenerationImageId) {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API_URL}/getImageGenerationProgress/${currentGenerationImageId}`,
        )
        const data = response.data
        if (data?.image_url) {
          const singleImage = data.image_url
          sliceImageIntoUrls(singleImage)
          .then((urls: string[])=> { 
            setCurrentImages(urls)
            updateCurrentImages(singleImage)
            
            })
            .catch(console.error)
          addHistoryItem({
            prompt: promptRef.current,
            imagesLink: singleImage,
          })
          setIsGeneratingImages(false)
          setCurrentGenerationImageId('')
          setProgressBarPercentage(0)
          return
        }
        if (data?.progress === 0 && progressBarPercentage < 97) {
          const randomIncrement = fakeProgress()
          setProgressBarPercentage((prev) => prev + randomIncrement)
          return
        }
        if (data?.progress > progressBarPercentage) {
          setProgressBarPercentage(data?.progress)
        }
      }
    } catch (e) {
      setShowBadWord(true)
      setIsBadPrompt(true)
      setIsGeneratingImages(false)
      setProgressBarPercentage(0)
      scrollToPromptField()

      console.log(e)
    }
  }

  useEffect(() => {
    if (!isGeneratingImages) return
    if (isBadPrompt) {
      if (intervalId) {
        clearInterval(intervalId)
      }
      return
    }
    const interval = setInterval(() => {
      fetchAndUpdateProgress()
    }, PROGRESS_BAR_FETCHING_INTERVAL_MS)

    setIntervalId(interval)

    setTimeout(() => {
      if (progressBarPercentage === 0)
        setProgressBarPercentage(DEFAULT_PROGRESS_INCREMENT)
    }, 5000)

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isGeneratingImages, currentGenerationImageId, isBadPrompt])

  useEffect(() => {
    toggleBodyScroll(!isSelectedImagePreviewModalOpen)
    return () => toggleBodyScroll(true)
  }, [isSelectedImagePreviewModalOpen])

  const toggleBodyScroll = (shouldEnable: boolean) => {
    document.body.style.overflow = shouldEnable ? 'auto' : 'hidden'
  }

  const clearGeneratedImages = () => {
    setCurrentImages([])
    setProgressBarPercentage(0)
    setCurrentGenerationImageId('')
  }

  const handleGenerateImage = async (description: string) => {
    if (!description.trim()) {
      inputRef?.current?.focus()
      return
    }
    clearGeneratedImages()
    setIsGeneratingImages(true)
    scrollToTShirtContainer()
    promptRef.current = description.trim()
    const response = await generateImage(description, imgGenerationRef, () => {

      setShowBadWord(true)
      setIsGeneratingImages(false)
      scrollToPromptField()
    })
    if (response?.imageId) {
      setCurrentGenerationImageId(response.imageId)
    }
  }
  const scrollToPromptField = () => {
    setTimeout(() => {
      const promptInput = document.getElementById('prompt-input')
      const sectionOffset = promptInput?.offsetTop
      if (
        promptInput &&
        !checkIfElementIsInViewPort(promptInput) &&
        sectionOffset
      ) {
        window.scrollTo({ top: sectionOffset - 120, behavior: 'smooth' })
      }
    }, 0)
  }

  const scrollToTShirtContainer = () => {
    setTimeout(() => {
      const tShirtContainerDiv = document.getElementById('t-shirt-container')
      if (
        tShirtContainerDiv &&
        !checkIfElementIsInViewPort(tShirtContainerDiv)
      ) {
        scrollToSection('t-shirt-container')
      }
    }, 0)
  }

  const renderPreviewImage = (imageUrl: string, index: number) => {

    return (
    <div
      key={index}
      className={`flex items-center justify-center border cursor-pointer 
      min-w-[120px] 
      sm:min-h-[140px] sm:min-w-[140px]
      ${
        index === focusedPhotoIndex
          ? 'border-light-blue border-4 shadow-xl'
          : 'border-gray-300 border-2'
      } mr-1 rounded-md`}
      onClick={() => {
        if (focusedPhotoIndex === index) {
          setIsSelectedImagePreviewModalOpen(true)
          return
        }
        setFocusedPhotoIndex(index)
      }}
    >
      <img src={imageUrl} className="rounded-sm sm:w-auto secure" />
    </div>
  )}

  const renderEmptyPreviewImage = (index: number) => (
    <div
      key={index}
      className={`flex items-center justify-center border cursor-pointer border-gray-200 w-[120px] h-[120px] min-h-[120px] min-w-[120px] sm:w-[140px] sm:h-[140px] sm:min-h-[140px] sm:in-w-[140px] mx-2 rounded-md ${
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

  const aditionalStyle = currentItem.gender === 'female' ? 'left-[30%] top-[100px]' : 'left-[28%] top-[100px]'

  const gradientBgLoaderStyle =
    'bg-gradient-to-r from-very-light-blue via-very-light-blue to-white background-animate'
  return (
    <div
      className="min-h-full bg-dark-blue py-4 px-4 md:px-8 lg:px-16 xl:px-32 flex justify-center items-center py-20"
      id="t-shirt-container"
    >
      <div className="bg-nsm-gray-400 rounded-2xl sm:max-w-[1440px] px-0 w-full">
        {/* <GeneratorForm
          ref={inputRef}
          showBadWord={showBadWord}
          setShowBadWord={setShowBadWord}
          onGenerateImage={handleGenerateImage}
          isDisabled={isGeneratingImages}
          onHistoryClicked={onHistoryClicked}
        /> */}
        <ErrorPage onHistoryClicked={onHistoryClicked} />
        <div className="flex w-full h-full flex-col xl:flex-row mb-8">
          <div className="flex xl:w-2/3 flex-col items-center justify-center w-full pt-4 relative xl:px-2">
            {currentImages && currentImages.length > 0 ? (
              <div className="relative">
                <img
                  width={400}
                  src={
                    currentItem.gender === 'male'
                      ? TSHIRTS[currentItem.color]
                      : TSHIRTS_F[currentItem.color]
                  }
                  className={`px-2 mb-8`}
                />
                <div
                  className={`w-[160px] max-h-[255px]
                  sm:w-[170px] max-h-[255px] z-[20]
                  absolute top-[120px] sm:mb-40 mr-1 sm:mr-2 rounded-md cursor-pointer  ${aditionalStyle}`}
                  onClick={() => {
                    setIsSelectedImagePreviewModalOpen(true)
                  }}
                >
                  <img
                    className={`secure w-[150px] max-h-[255px]
                  sm:w-[170px] max-h-[255px]
                   sm:mb-40 mr-1 sm:mr-2 rounded-md cursor-pointer sm:mt-[20px]`}
                    src={currentImages[focusedPhotoIndex]}
                  />
                </div>
              </div>
            ) : (
              <div className="relative">
                <div
                  className={
                    'text-gray-400 font-bold flex justify-center items-center rounded-md max-h-[520px] w-full relative overflow-hidden'
                  }
                >
                  <img
                    width={400}
                    src={
                      currentItem.gender === 'male'
                        ? TSHIRTS[currentItem.color]
                        : TSHIRTS_F[currentItem.color]
                    }
                    className="px-2 mb-8"
                  />
                  <div
                    className={`flex absolute items-center justify-center sm:w-[160px] sm:h-[160px] w-[150px] h-[150px] absolute mb-32 sm:mb-40 mr-1 sm:mr-2 rounded-md ${
                      isGeneratingImages ? 'bg-gray-transparent' : 'bg-gray-200'
                    } ${aditionalStyle}`}
                  >
                    {isGeneratingImages && (
                      <div className="loader w-[140px] h-[140px] sm:w-[160px] sm:h-[160px]">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    )}
                  </div>
                  {isGeneratingImages && (
                    <div className="w-full absolute bottom-0">
                      <div className="mb-2 m-auto flex items-center justify-center">
                        <div className="font-normal text-light-blue">
                          {progressBarPercentage}%
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 h-2.5 dark:bg-gray-100 absolute bottom-0 rounded-md">
                        <div
                          className="bg-light-blue h-2.5 rounded-full"
                          style={{
                            width: `${progressBarPercentage}%`,
                            transition: 'width 0.3s ease',
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center md:justify-center w-full mt-2 overflow-x-auto pb-3 sm:pb-8 hide-scrollbar">
              {currentImages.length > 0
                ? currentImages.map((imageUrl, index) => {
                    return renderPreviewImage(imageUrl, index)
                  })
                : Array.from({ length: 4 }).map((_, index) => {
                    return renderEmptyPreviewImage(index)
                  })}
            </div>
          </div>

          <div className="xl:w-1/3 flex xl:justify-center flex-col w-full relative mr-4 px-4">
            {windowWidth >= EXTRA_LARGE_SCREEN && (
              <div className="absolute h-[95%] w-[1px] bg-neutral-300 mb-[33px]" />
            )}
            <div className="lg:pl-10">
              <div className="flex flex-col">
                <h3 className="font-bold text-[23px]">Boja majice</h3>
                <ColorPicker onColorPick={updateColor} />
              </div>
              <div className="flex flex-col justify-center mb-4 mt-4">
                <h3 className="font-bold text-[23px] mr-4 mb-2">Pol</h3>
                <GenderRadioButtons
                  onChange={(gender) => updateCurrentItem({ gender })}
                />
              </div>
              <div className="flex-row mt-8 mb-2">
                <div className="flex items-center">
                  <h3 className="font-bold text-[23px] mr-4 mb-2">Veličina</h3>
                  <div
                    className={'mb-2'}
                    onClick={() => {
                      scrollToSection('tShirtSizes')
                    }}
                  >
                    <InformationCircleOutline
                      color={'#00000'}
                      title={'Pogledaj veličine'}
                      height="30px"
                      width="30px"
                    />
                  </div>
                </div>
                <TShirtSizeSelector
                  onSizeChange={updateSize}
                  type={currentItem.gender}
                />
              </div>
              <div className="flex text-[#FAC43C] my-12">
                <p className="bg-[#102E4A] right p-2 text-2xl">
                  {2300 * currentItem.quantity} RSD
                </p>
              </div>
              <div className="flex items-center justify-center w-full mt-5">
                <Button
                  isMain
                  text={'Dodaj u korpu'}
                  onClick={handleAddToCart}
                  customStyles={`w-full ${currentImages.length === 0 && 'bg-gray-300'}`}
                  isDisabled={currentImages.length === 0}
                  disabledText={'Dodaj u korpu'}
                />
              </div>
            </div>
          </div>
          {isSelectedImagePreviewModalOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-30 overflow-auto"
              onClick={() => setIsSelectedImagePreviewModalOpen(false)}
            >
              <div
                className="relative z-50"
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                <img
                  src={currentImages[focusedPhotoIndex]}
                  alt="Full view"
                  className="object-contain mx-auto my-0 secure"
                  style={{ maxHeight: 'calc(100vh - 2rem)' }}
                />
                <div
                  onClick={() => setIsSelectedImagePreviewModalOpen(false)}
                  className="absolute top-0 right-0 p-2 z-40 bg-gray-900 cursor-pointer"
                >
                  <Close height="30px" width="30px" color="#fff" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ClothesGenerator
