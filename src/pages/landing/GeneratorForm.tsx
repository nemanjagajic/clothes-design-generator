import React, { Dispatch, SetStateAction, forwardRef, useEffect, useMemo, useState, useRef, useCallback } from 'react'
import Button from '../../components/shared/Button'
import axios from 'axios';
import { CloseOutline } from 'react-ionicons'
import Timer from '../../components/timer/Timer';


interface GeneratorFormProps {
    showBadWord: boolean
    isDisabled: boolean
    setShowBadWord: Dispatch<SetStateAction<boolean>>
    onGenerateImage: (description: string) => void
}

const TIME_LIMIT = 12 * 60 * 60 * 1000; // 12 hours in milliseconds
const RETRIES = 5

const GeneratorForm = forwardRef<HTMLTextAreaElement, GeneratorFormProps>(({ showBadWord, setShowBadWord, isDisabled, onGenerateImage }, ref) => {

    const [description, setDescription] = useState('');
    const [isGenerationLimitReached, setIsGenerationLimitReached] = useState(false)
    const progressBarRef = useRef(null);
    const messageRef = useRef(null);
    const [showGenerationsLeftMessage, setShowGenerationsLeftMessage] = useState(false)

    useEffect(() => {
        if (progressBarRef.current && messageRef.current && showGenerationsLeftMessage) {
            setTimeout(() => {
                // @ts-ignore
                progressBarRef.current.style.width = '100%';
                // @ts-ignore
                messageRef.current.style.opacity = 1;

            }, 0)
        }
    }, [showGenerationsLeftMessage]);
    const [clickData, setClickData] = useState<{ count: number, lastClickTime: number | null }>({ count: 0, lastClickTime: null })

    useEffect(() => {

        const clickDataLS = localStorage.getItem('clickData')
        if (clickDataLS) {
            const clickDataObj = JSON.parse(clickDataLS)
            if (clickDataObj.lastClickTime && Date.now() - clickDataObj.lastClickTime > TIME_LIMIT) {
                resetTimer()
                return
            } else {
                setClickData(JSON.parse(clickDataLS))
            }
        }
    }, []);

    useEffect(() => {
        if (clickData.lastClickTime)
            localStorage.setItem('clickData', JSON.stringify(clickData))
    }, [clickData])

    const timeInSeconds = useMemo(() => {
        const currentTime = Date.now();
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

    const timeHasPassed = useCallback((time?: number) => {
        const currentTime = time || Date.now()
        if (clickData.lastClickTime) {
            console.log({ clickData, passed: currentTime - clickData.lastClickTime > TIME_LIMIT })
            return currentTime - clickData.lastClickTime > TIME_LIMIT
        }

        return true
    }, [clickData.lastClickTime, clickData.count])

    const notifyAboutNumberOfRetries = () => {
        setShowGenerationsLeftMessage(true)
        setTimeout(() => {
            setShowGenerationsLeftMessage(false)
        }, 5000)
    }

    const checkAndIncreaseGenerationLimit = () => {
        const currentTime = Date.now();

        if ((timeHasPassed(currentTime) && clickData.lastClickTime)) {
            resetTimer(1)
            setIsGenerationLimitReached(false)
            notifyAboutNumberOfRetries()
            return true
        }

        if (clickData.count < RETRIES) {
            notifyAboutNumberOfRetries()
            setClickData({ count: clickData.count + 1, lastClickTime: currentTime })
            setIsGenerationLimitReached(clickData.count + 1 >= RETRIES);
            return true;
        } else {
            setIsGenerationLimitReached(true);
            return false;
        }
    };

    const handleSubmit = (description: string) => {
        if (checkAndIncreaseGenerationLimit()) {
            // @ts-ignore
            if (window.grecaptcha) {
                //@ts-ignore
                window.grecaptcha.ready(() => {
                    //@ts-ignore
                    window.grecaptcha
                        .execute(process.env.REACT_APP_CAPTCHA_SITE_KEY, { action: 'submit' })
                        .then(async (value: string) => {
                            await axios.post(`${process.env.REACT_APP_BASE_API_URL}/verify-captcha`, {
                                captchaValue: value
                            })
                            onGenerateImage(description)
                            setShowBadWord(false)
                        });
                });
            }
        }
    };

    const disabledButtonText = useMemo(() => {
        if (isDisabled) {
            return 'Slike se generišu...'
        }

        if (!isGenerationLimitReached) {
            return 'Napravi'
        }
    }, [isDisabled, isGenerationLimitReached])

    const generationsLeft = useMemo(() => {
        return RETRIES - clickData.count
    }, [clickData.count])

    const resetTimer = (count: number = 0) => {
        setIsGenerationLimitReached(false)
        setClickData({ count: count, lastClickTime: null })
        localStorage.setItem('clickData', `{ "count": ${count}, "lastClickTime": null }`)
    }

    const rateLimitCrossed = useMemo(() => {
        return clickData.count >= RETRIES
    }, [clickData.count])

    const shouldDisplayTimer = useMemo(() => {
        return rateLimitCrossed && !timeHasPassed(Date.now())
    }, [rateLimitCrossed, timeHasPassed])


    return (
        <div
            className="mt-6 flex flex-col lg:flex-row w-full px-4 pt-8"
            id="prompt-input"
        >
            <div className="relative w-full md:w-[1/2]">
                {showGenerationsLeftMessage && (
                    <div
                        ref={messageRef}
                        className="absolute flex flex-row justify-between -mt-[58px] rounded-md py-4 pr-4 bg-navy-blue text-white text-base w-full"
                        style={{
                            opacity: 0,
                            transition: 'opacity 0.5s ease'
                        }}
                    >
                        <div className="pl-4">{`Imaš još ${RETRIES - clickData.count} generisanja, nakon 12h dobijaš novih 5 ✨`}</div>
                        <div className="cursor-pointer" onClick={() => { setShowGenerationsLeftMessage(false) }}>
                            <CloseOutline color={'white'} />
                        </div>
                        <div className="w-full h-2 bg-blue-900 absolute bottom-0 rounded-md">
                            <div
                                ref={progressBarRef}
                                className="bg-light-blue h-2 rounded-full"
                                style={{
                                    width: '0%',
                                    transition: 'width 5s ease'
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
                    className="w-full min-h-[100px] md:min-h-[50px] md:h-[50px] border border-gray-300 rounded-md focus:outline-none p-4 md:p-3"
                />
                {showBadWord && (
                    <p className="text-[#F00]">
                        *ne možete koristiti psovke ili uvredljive reči
                    </p>
                )}
            </div>
            <br />
            <div className="mx-2 mb-2">
            </div>
            {(shouldDisplayTimer) ? <Timer onTimeout={resetTimer} seconds={timeInSeconds} /> : (<Button
                isMain={false}
                text={'Napravi'}
                onClick={() => handleSubmit(description)}
                customStyles={`w-full h-[50px] sm:w-[350px] sm:ml-4 ${(isDisabled || !description.trim()) && 'bg-gray-300'}`}
                isDisabled={isDisabled || shouldDisplayTimer || !description.trim()}
                disabledText={disabledButtonText}
            />)}

        </div>
    )
})

export default GeneratorForm
