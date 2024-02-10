import React, { forwardRef, useEffect, useRef, useState } from 'react'
import Button from '../../components/shared/Button'
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';


interface GeneratorFormProps {
    showBadWord: boolean
    isDisabled: boolean
    onGenerateImage: (description: string) => void
}

const GeneratorForm = forwardRef<HTMLTextAreaElement, GeneratorFormProps>(({ showBadWord, isDisabled, onGenerateImage }, ref) => {

    const [description, setDescription] = useState('')

    const [captchaValue, setCaptchaValue] = useState<string | null>(null);
    const captchaRef = useRef<ReCAPTCHA>(null);

    const handleCaptchaChange = async (value: string | null) => {
        setCaptchaValue(value);
        console.log("Captcha value:", value);
        await axios.post(`${process.env.REACT_APP_BASE_API_URL}/verify-captcha`, {
            captchaValue: value
        })
    };

    const handleSubmit = (description: string) => {
        onGenerateImage(description)
        setCaptchaValue(null);
        if (captchaRef.current) {
            captchaRef.current.reset();
        }
    };

    useEffect(() => {
        console.log({ description, isDisabled }, !description.trim() || isDisabled)
    }, [description, isDisabled])

    return (
        <div
            className="mt-6 flex flex-col md:flex-row w-full px-4 pt-8"
            id="prompt-input"
        >
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
            <br />
            <div className='mx-2 mb-2'>
                <ReCAPTCHA
                    ref={captchaRef}
                    sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY || ''}
                    onChange={handleCaptchaChange}
                />
            </div>
            <Button
                isMain={false}
                text={'Napravi'}
                onClick={() => handleSubmit(description)}
                customStyles={`w-full h-[50px] md:w-[300px] md:ml-4 ${(isDisabled || !description.trim() || !captchaValue) && 'bg-gray-300'}`}
                isDisabled={isDisabled || !description.trim() || !captchaValue}
                disabledText={
                    isDisabled
                        ? 'Slike se generišu...'
                        : 'Napravi'
                }
            />

            {/*{!!isDisabled && <EmailCard userId={userId} />}*/}
        </div>
    )
})

export default GeneratorForm