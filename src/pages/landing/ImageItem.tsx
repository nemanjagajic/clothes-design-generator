import React, { FC, useState } from 'react'
import TypingAnimation from '../../components/shared/TypingAnimation';

interface ImageItemProps {
    onMouseEnter: (e: any) => void;
    onMouseLeave: (e: any) => void;
    key: number;
    image: string;
    prompt: string
}

const lampStyle = {
    background: `rgba(250, 249, 241, 0.4) 360px`,
    zIndex: 10
};

const ImageItem: FC<ImageItemProps> = ({ onMouseEnter, onMouseLeave, key, image, prompt }) => {
    const [isFocused, setIsFocused] = useState(false)

    const handleMouseEnter = (e: any) => {
        setIsFocused(true)
        onMouseEnter(e)
    }

    const handleMouseLeave = (e: any) => {
        setIsFocused(false)
        onMouseLeave(e)
    }

    return <div
        onMouseEnter={handleMouseEnter}
        onTouchStart={handleMouseEnter}
        onTouchEnd={handleMouseLeave}
        onMouseLeave={handleMouseLeave}
        key={key}
        className='flex-shrink-0 p-1 m-1 transition duration-500 ease-in-out transform hover:scale-105 hover:z-20 rounded-xl relative scrollbar-hide sm:w-[440px] w-[300px]'
    >
        <img
            src={image}
            alt={`Image ${key}`}
            className='w-full h-full object-cover rounded-md'
        />
        {isFocused && (
            <p className='w-[250px] sm:w-[350px] text-3xl font-bold absolute bottom-[15px] left-1/2 transform -translate-x-1/2 text-gray-100 text-glow'><TypingAnimation text={prompt} speed={20} /></p>
        )}
        {!isFocused && (<div className="absolute inset-0 pointer-events-none " style={lampStyle}></div>)}

    </div>

}

export default ImageItem