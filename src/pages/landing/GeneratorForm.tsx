import {
  Dispatch,
  SetStateAction,
  forwardRef,
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
} from 'react'
import Button from '../../components/shared/Button'
import { CloseOutline, TimerOutline } from 'react-ionicons'
import Timer from '../../components/timer/Timer'
import UploadPhotoButton from './ImageGenerator/UploadPhotoButton'

interface GeneratorFormProps {
  showBadWord: boolean
  isDisabled: boolean
  setShowBadWord: Dispatch<SetStateAction<boolean>>
  onGenerateImage: (description: string) => void
  onHistoryClicked?: (() => void) | null
  onUpload: (file: File) => void
}

const TIME_LIMIT = 12 * 60 * 60 * 1000 // 12 hours in milliseconds
const RETRIES = 5

const GeneratorForm = forwardRef<HTMLTextAreaElement, GeneratorFormProps>(
  (
    {
      showBadWord,
      setShowBadWord,
      isDisabled,
      onGenerateImage,
      onHistoryClicked,
      onUpload
    },
    ref,
  ) => {
    const [description, setDescription] = useState('')
    const [isGenerationLimitReached, setIsGenerationLimitReached] =
      useState(false)
    const progressBarRef = useRef(null)
    const messageRef = useRef(null)
    const [showGenerationsLeftMessage, setShowGenerationsLeftMessage] =
      useState(false)

    const [shape, setShape] = useState<'square' | 'rectangle'>('square')

    useEffect(() => {
      if (
        progressBarRef.current &&
        messageRef.current &&
        showGenerationsLeftMessage
      ) {
        setTimeout(() => {
          // @ts-ignore
          progressBarRef.current.style.width = '100%'
          // @ts-ignore
          messageRef.current.style.opacity = 1
        }, 0)
      }
    }, [showGenerationsLeftMessage])
    const [clickData, setClickData] = useState<{
      count: number
      lastClickTime: number | null
    }>({ count: 0, lastClickTime: null })

    useEffect(() => {
      const clickDataLS = localStorage.getItem('clickData')
      if (clickDataLS) {
        const clickDataObj = JSON.parse(clickDataLS)
        if (
          clickDataObj.lastClickTime &&
          Date.now() - clickDataObj.lastClickTime > TIME_LIMIT
        ) {
          resetTimer()
          return
        } else {
          setClickData(JSON.parse(clickDataLS))
        }
      }
    }, [])

    useEffect(() => {
      if (clickData.lastClickTime)
        localStorage.setItem('clickData', JSON.stringify(clickData))
    }, [clickData])

    const timeInSeconds = useMemo(() => {
      const currentTime = Date.now()
      if (clickData.lastClickTime) {
        const timeLeft = TIME_LIMIT - (currentTime - clickData.lastClickTime)
        if (timeLeft < 0) {
          return 0
        }

        return Math.round(timeLeft / 1000)
      } else {
        return 0
      }
    }, [clickData.lastClickTime])

    const timeHasPassed = useCallback(
      (time?: number) => {
        const currentTime = time || Date.now()
        if (clickData.lastClickTime) {
          return currentTime - clickData.lastClickTime > TIME_LIMIT
        }

        return true
      },
      [clickData.lastClickTime, clickData.count],
    )

    const notifyAboutNumberOfRetries = () => {
      setShowGenerationsLeftMessage(true)
      setTimeout(() => {
        setShowGenerationsLeftMessage(false)
      }, 5000)
    }

    const checkAndIncreaseGenerationLimit = () => {
      const currentTime = Date.now()

      if (timeHasPassed(currentTime) && clickData.lastClickTime) {
        resetTimer(1)
        setIsGenerationLimitReached(false)
        notifyAboutNumberOfRetries()
        return true
      }

      if (clickData.count < RETRIES) {
        notifyAboutNumberOfRetries()
        setClickData({ count: clickData.count + 1, lastClickTime: currentTime })
        setIsGenerationLimitReached(clickData.count + 1 >= RETRIES)
        return true
      } else {
        setIsGenerationLimitReached(true)
        return false
      }
    }

    const handleSubmit = (description: string) => {
      if (checkAndIncreaseGenerationLimit()) {
        const prompt =
                  shape === 'rectangle'
                    ? description + ' --ar 2:3'
                    : description
                onGenerateImage(prompt)
                setShowBadWord(false)
        // @ts-ignore
        // if (window.grecaptcha) {
        //   //@ts-ignore
        //   window.grecaptcha.ready(() => {
        //     //@ts-ignore
        //     window.grecaptcha
        //       .execute(process.env.REACT_APP_CAPTCHA_SITE_KEY, {
        //         action: 'submit',
        //       })
        //       .then(async (value: string) => {
        //         await axios.post(
        //           `${process.env.REACT_APP_BASE_API_URL}/verify-captcha`,
        //           {
        //             captchaValue: value,
        //           },
        //         )

        //         const prompt =
        //           shape === 'rectangle'
        //             ? description + ' --ar 2:3'
        //             : description
        //         onGenerateImage(prompt)
        //         setShowBadWord(false)
        //       })
        //   })
        // }
      }
    }

    const disabledButtonText = useMemo(() => {
      if (isDisabled) {
        return 'Kreiranje...'
      }

      if (!isGenerationLimitReached) {
        return 'Napravi'
      }
    }, [isDisabled, isGenerationLimitReached])

    const resetTimer = (count: number = 0) => {
      setIsGenerationLimitReached(false)
      setClickData({ count: count, lastClickTime: null })
      localStorage.setItem(
        'clickData',
        `{ "count": ${count}, "lastClickTime": null }`,
      )
    }

    const rateLimitCrossed = useMemo(() => {
      return clickData.count >= RETRIES
    }, [clickData.count])

    const shouldDisplayTimer = useMemo(() => {
      return rateLimitCrossed && !timeHasPassed(Date.now())
    }, [rateLimitCrossed, timeHasPassed])

    return (
      <div
        className="my-6 flex flex-col lg:flex-row w-full px-4 pt-8 justify-center"
        id="prompt-input"
      >
        <div className="relative w-full md:w-1/2">
          {showGenerationsLeftMessage && (
            <div
              ref={messageRef}
              className="absolute flex flex-row justify-between -mt-[58px] rounded-md py-4 pr-4 bg-navy-blue text-white text-base w-full"
              style={{
                opacity: 0,
                transition: 'opacity 0.5s ease',
              }}
            >
              <div className="pl-4">{`Imaš još ${RETRIES - clickData.count} generisanja, nakon 12h dobijaš novih 5 ✨`}</div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  setShowGenerationsLeftMessage(false)
                }}
              >
                <CloseOutline color={'white'} />
              </div>
              <div className="w-full h-2 bg-blue-900 absolute bottom-0 rounded-md">
                <div
                  ref={progressBarRef}
                  className="bg-light-blue h-2 rounded-full"
                  style={{
                    width: '0%',
                    transition: 'width 5s ease',
                  }}
                ></div>
              </div>
            </div>
          )}
          <textarea
            placeholder="Ovde opiši sliku kakvu želiš na majici ispod"
            value={description}
            ref={ref}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-[100px] md:min-h-[50px] md:h-[50px] border border-gray-300 rounded-md focus:outline-none p-4 md:p-3 text-xl border-2 border-blue-300 shadow-xl"
          />
          {/* <div className="w-full flex items-center my-8 justify-center sm:justify-start">
            <h3 className="text-2xl mr-4 font-bold">Oblik printa: </h3>
            <ImageShape shape={shape} onChange={setShape} />
          </div> */}
          {showBadWord && (
            <p className="text-[#F00]">
              *ne možete koristiti psovke ili uvredljive reči
            </p>
          )}
        </div>
        <br />
        <div className="mx-2 mb-2"></div>
        <div className="sm:flex flex-col sm:flex-row sm:space-y-0 space-y-4">
          {shouldDisplayTimer ? (
            <Timer onTimeout={resetTimer} seconds={timeInSeconds} />
          ) : (
            <Button
              isMain={false}
              text={'Napravi'}
              onClick={() => handleSubmit(description)}
              customStyles={`w-full h-[50px] sm:w-[200px] sm:ml-4 ${(isDisabled || !description.trim()) && 'bg-gray-300'}`}
              isDisabled={
                isDisabled || shouldDisplayTimer || !description.trim()
              }
              disabledText={disabledButtonText}
            />
          )}
          <div className="flex">
            <UploadPhotoButton onUpload={onUpload}/>
            {!!onHistoryClicked && (
              <div
                id={'history-button'}
                onClick={onHistoryClicked}
                className="flex justify-center items-center bg-white border-2 mx-2 p-2 rounded-sm shadow cursor-pointer h-[50px] w-[140px]"
              >
                <div className="mr-2 text-lg text-gray-800">Istorija</div>
                <div>
                  <TimerOutline
                    color={'#00000'}
                    title={'Istorija'}
                    height="30px"
                    width="30px"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  },
)

export default GeneratorForm
