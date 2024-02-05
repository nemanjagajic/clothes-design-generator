import React, { useEffect, useRef, useState } from 'react'
import toastr from 'toastr'
import { generateImage } from '../../api/imageGenerator'
import Button from '../../components/shared/Button'
import axios from 'axios'
import ColorPicker from '../../components/shared/ColorPicker'
import { Item, useItems } from '../../store/ItemsContext'
import { useSearchParams } from 'react-router-dom'
// @ts-ignore
import blackTShirt from '../../assets/images/black-tshirt.png'
import { Close } from 'react-ionicons'
import GenderRadioButtons from './GenderRadioButtons'
import {
  checkIfElementIsInViewPort,
  scrollToSection,
} from '../../utils/pageNavigation'
import TShirtSizeSelector from '../../components/shared/TShirtSizeSelector'
import { useWindowWidth } from '../../utils/useWindowWidth'
import { EXTRA_LARGE_SCREEN, LARGE_SCREEN, MEDIUM_SCREEN } from '../../constants/screenSizes'

const PROGRESS_BAR_FETCHING_INTERVAL_MS = 5000
const DEFAULT_PROGRESS_INCREMENT = 2

type ClothesGeneratorTypes = {
  imgGenerationRef: string
}

const ClothesGenerator = ({ imgGenerationRef }: ClothesGeneratorTypes) => {
  const [description, setDescription] = useState('')
  const [showBadWord, setShowBadWord] = useState(false)
  const [isGeneratingImages, setIsGeneratingImages] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [focusedPhotoIndex, setFocusedPhotoIndex] = useState(0)
  const [isSelectedImagePreviewModalOpen, setIsSelectedImagePreviewModalOpen] =
    useState(false)
  const [currentGenerationImageId, setCurrentGenerationImageId] = useState('')

  const progressBarPercentageRef = useRef(0)
  const [progressBarRenderTrigger, setProgressBarRenderTrigger] = useState(false)

  const [searchParams] = useSearchParams()

  const windowWidth = useWindowWidth()

  useEffect(() => {
    if (generatedImages.length)
      localStorage.setItem('images', JSON.stringify(generatedImages))
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
      const imagesFromStorage = localStorage.getItem('images')
      if (imagesFromStorage) {
        setGeneratedImages(JSON.parse(imagesFromStorage))
      }
    } catch (error) { }
  }, [])

  const { updateCurrentItem, addToCart, currentItem, userId } = useItems()

  useEffect(() => {
    updateCurrentItem({ imageUrl: generatedImages[focusedPhotoIndex] })
  }, [generatedImages, focusedPhotoIndex])

  const getRandomOneTwoOrThree = () => {
    return Math.floor(Math.random() * 3) + 1;
  }

  const handleAddToCart = () => {
    toastr.success("Majica vas čeka u korpi 👕", "Dodato! 🎉", {
      timeOut: 3000,
      positionClass: 'toast-bottom-right'
    })
    addToCart(currentItem)
  }

  const fetchAndUpdateProgress = async () => {
    try {
      const {
        data: { progress, response },
      } = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/getImageGenerationProgress/${currentGenerationImageId}`,
      )
      if (response.upscaled_urls) {
        setGeneratedImages(response.upscaled_urls)
        setIsGeneratingImages(false)
        setCurrentGenerationImageId('')
        progressBarPercentageRef.current = 0
        return
      }
      if (progress === 0 && progressBarPercentageRef.current < 97) {
        const randomIncrement = getRandomOneTwoOrThree()
        progressBarPercentageRef.current += randomIncrement
        setProgressBarRenderTrigger(prev => !prev)
        return
      }
      if (progress > progressBarPercentageRef.current) {
        progressBarPercentageRef.current = progress
        setProgressBarRenderTrigger(prev => !prev)
      }
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
      if (progressBarPercentageRef.current === 0)
        progressBarPercentageRef.current = DEFAULT_PROGRESS_INCREMENT
    }, 1000)

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isGeneratingImages, currentGenerationImageId])

  useEffect(() => {
    toggleBodyScroll(!isSelectedImagePreviewModalOpen)
    return () => toggleBodyScroll(true)
  }, [isSelectedImagePreviewModalOpen])

  const toggleBodyScroll = (shouldEnable: boolean) => {
    document.body.style.overflow = shouldEnable ? 'auto' : 'hidden'
  }

  const clearGeneratedImages = () => {
    setGeneratedImages([])
    progressBarPercentageRef.current = 0
    setCurrentGenerationImageId('')
  }

  const handleGenerateImage = async () => {
    clearGeneratedImages()
    setIsGeneratingImages(true)
    scrollToTShirtContainer()
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

  const renderPreviewImage = (imageUrl: string, index: number) => (
    <div
      key={index}
      className={`flex items-center justify-center border cursor-pointer w-[120px] h-[120px] min-h-[120px] min-w-[120px] sm:w-[140px] sm:h-[140px] sm:min-h-[140px] sm:in-w-[140px]
      ${index === focusedPhotoIndex
          ? 'border-light-blue border-2'
          : 'border-gray-300 border-2'
        } mr-2 rounded-lg p-1`}
      onClick={() => {
        if (focusedPhotoIndex === index) {
          setIsSelectedImagePreviewModalOpen(true)
          return
        }
        setFocusedPhotoIndex(index)
      }}

    >
      <img src={imageUrl} className="rounded-md" />
    </div>
  )

  const renderEmptyPreviewImage = (index: number) => (
    <div
      key={index}
      className={`flex items-center justify-center border cursor-pointer border-gray-200 w-[120px] h-[120px] min-h-[120px] min-w-[120px] sm:w-[140px] sm:h-[140px] sm:min-h-[140px] sm:in-w-[140px] mx-2 rounded-md ${isGeneratingImages && gradientBgLoaderStyle
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
    <div className="min-h-full bg-dark-blue py-4 md:px-8">
      <div className="bg-nsm-gray-400 rounded-2xl">
        <div
          className="mt-6 flex flex-col md:flex-row w-full px-4 pt-8"
          id="prompt-input"
        >
          <textarea
            placeholder="Ovde opiši sliku kakvu želiš na majici ispod"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-[100px] md:min-h-[50px] md:h-[50px] border border-gray-300 rounded-md focus:outline-none p-4 md:p-3"
          />
          {showBadWord && (
            <p className="text-[#F00]">
              *ne možete koristiti psovke ili uvredljive reči
            </p>
          )}
          <br />
          <Button
            isMain={false}
            text={'Napravi'}
            onClick={handleGenerateImage}
            customStyles={'w-full h-[50px] md:w-[300px] md:ml-4'}
            isDisabled={isGeneratingImages || !description.trim()}
            disabledText={
              isGeneratingImages
                ? 'Slike se generišu...'
                : 'Napravi sliku za majicu'
            }
          />

          {/*{!!isGeneratingImages && <EmailCard userId={userId} />}*/}
        </div>

        <div className="flex w-full h-full flex-col xl:flex-row mb-8 px-4 bg">
          <div
            id="t-shirt-container"
            className="flex flex-col items-center justify-center w-full pt-4 xl:min-w-[50%] relative xl:px-2"
          >
            {generatedImages && generatedImages.length > 0 ? (
              <>
                <img width={400} src={blackTShirt} className="px-2 mb-8" />
                <img
                  className="w-[140px] h-[140px] sm:w-[170px] sm:h-[170px] absolute top-[90px] sm:mb-40 mr-1 sm:mr-2 rounded-md cursor-pointer"
                  onClick={() => setIsSelectedImagePreviewModalOpen(true)}
                  width={170}
                  src={generatedImages[focusedPhotoIndex]}
                />
              </>
            ) : (
              <div
                className={
                  'text-gray-400 font-bold flex justify-center items-center rounded-md max-h-[500px] w-full relative overflow-hidden'
                }
              >
                <img width={400} src={blackTShirt} className="px-2 mb-8" />
                <div
                  className={`flex items-center justify-center w-[140px] h-[140px] sm:w-[170px] sm:h-[170px] absolute mb-32 sm:mb-40 mr-1 sm:mr-2 rounded-md ${isGeneratingImages ? 'bg-gray-transparent' : 'bg-gray-200'
                    }`}
                >
                  {isGeneratingImages && (
                    <div className="loader w-[140px] h-[140px] sm:w-[170px] sm:h-[170px]">
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
                        {progressBarPercentageRef.current}%
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 h-2.5 dark:bg-gray-100 absolute bottom-0 rounded-md">
                      <div
                        className="bg-light-blue h-2.5 rounded-full"
                        style={{
                          width: `${progressBarPercentageRef.current}%`,
                          transition: 'width 0.3s ease',
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center md:justify-center w-full mt-2 overflow-x-auto pb-3 sm:pb-8 hide-scrollbar">
              {generatedImages.length > 0
                ? generatedImages.map((imageUrl, index) => {
                  return renderPreviewImage(imageUrl, index)
                })
                : Array.from({ length: 4 }).map((_, index) => {
                  return renderEmptyPreviewImage(index)
                })}
            </div>
          </div>

          <div className="flex xl:justify-center flex-col w-full mt-4 xl:min-w-[50%] relative">
            {windowWidth >= EXTRA_LARGE_SCREEN && (
              <div className="absolute h-[95%] w-[1px] bg-neutral-300 mb-[33px]" />
            )}
            <div className="lg:pl-10">
              <div className="flex flex-col">
                <h3 className="font-bold text-[18px]">Izaberi boju majice</h3>
                <ColorPicker onColorPick={updateColor} />
              </div>
              <div className="flex flex-col justify-center mb-4 mt-4">
                <h3 className="font-bold text-[18px] mr-4 mb-2">Izaberi pol</h3>
                <GenderRadioButtons
                  onChange={(gender) => updateCurrentItem({ gender })}
                />
              </div>
              <div className="flex-row mt-8 mb-2">
                <h3 className="font-bold text-[18px] mr-4 mb-2">
                  Izaberi veličinu
                </h3>
                <TShirtSizeSelector onSizeChange={updateSize} />
              </div>

              <div className="flex items-center justify-center w-full mt-5">
                <Button
                  isMain
                  text={'Dodaj u korpu'}
                  onClick={handleAddToCart}
                  customStyles={'w-full'}
                  isDisabled={generatedImages.length === 0}
                  disabledText={'Dodaj u korpu'}
                />
              </div>
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
