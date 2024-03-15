import React, { Dispatch, SetStateAction, forwardRef, useEffect, useMemo, useState } from 'react'
import Button from '../../components/shared/Button'
import axios from 'axios';


interface GeneratorFormProps {
    showBadWord: boolean
    isDisabled: boolean
    setShowBadWord: Dispatch<SetStateAction<boolean>>
    onGenerateImage: (description: string) => void
}

const TIME_LIMIT = 12 * 60 * 60 * 1000; // 12 hours in milliseconds
const RETRIES = 5

const GeneratorForm = forwardRef<HTMLTextAreaElement, GeneratorFormProps>(({ showBadWord, setShowBadWord, isDisabled, onGenerateImage }, ref) => {

    const [description, setDescription] = useState('')
    const [isGenerationLimitReached, setIsGenerationLimitReached] = useState(false)

    useEffect(() => {
        const currentTime = Date.now();
        const generationLimit = JSON.parse(localStorage.getItem('clickData') || '{"count": 0, "lastClickTime": 0}');
        if (currentTime - generationLimit.lastClickTime > TIME_LIMIT) {
            setIsGenerationLimitReached(false)
            localStorage.setItem('clickData', '{"count": 0, "lastClickTime": 0}')
            return
        }
        setIsGenerationLimitReached(generationLimit.count >= RETRIES);
    }, [])




    const checkAndIncreaseGenerationLimit = () => {
        const clickData = JSON.parse(localStorage.getItem('clickData') || '{"count": 0, "lastClickTime": 0}');
        const currentTime = Date.now();

        if (currentTime - clickData.lastClickTime > TIME_LIMIT) {
            setIsGenerationLimitReached(false)
            clickData.count = 0;
        }

        if (clickData.count < RETRIES) {
            clickData.count++;
            clickData.lastClickTime = currentTime;
            localStorage.setItem('clickData', JSON.stringify(clickData));
            setIsGenerationLimitReached(clickData.count >= RETRIES);
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

    return (
        <div
            className="mt-6 flex flex-col lg:flex-row w-full px-4 pt-8"
            id="prompt-input"
        >
            <div className='w-full md:w-[1/2]'>

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
            <div className='mx-2 mb-2'>
            </div>
            <Button
                isMain={false}
                text={'Napravi'}
                onClick={() => handleSubmit(description)}
                customStyles={`w-full h-[50px] sm:w-[350px] sm:ml-4 ${(isDisabled || isGenerationLimitReached || !description.trim()) && 'bg-gray-300'}`}
                isDisabled={isDisabled || isGenerationLimitReached || !description.trim()}
                disabledText={disabledButtonText}
            />

            {/*{!!isDisabled && <EmailCard userId={userId} />}*/}
        </div>
    )
})

export default GeneratorForm