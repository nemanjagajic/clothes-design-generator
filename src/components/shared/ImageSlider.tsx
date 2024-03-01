import React, { useCallback, useState } from "react";
import ButtonNavigate from "./ButtonNavigate";
import ExpandableText from "./ExpandableText";
//@ts-ignore
import minja from '../../assets/testimonials/minja.png'
//@ts-ignore
import vlada from '../../assets/testimonials/vlada.png'

interface Image {
    src: string;
    name: string;
    description: string;
}

interface ImageSliderProps {
}

const images = [
    { name: "Minja Brka", src: minja, description: "Oduševljen sam! Kupio sam majicu sa sopstvenim dizajnom i rezultat je izvanredan. Kvalitet pamuka je top, a print je savršen - oštar i živopisan. Definitivno preporučujem svima!" },
    { name: "Vladimir", src: vlada, description: "Majica s mojim dizajnom premašila je očekivanja - neverovatno mekan pamuk i izvanredan print. Boje i detalji su perfektni. Više od odeće, to je umetnost koju ponosno nosim. Toplo preporučujem!" }]


const ImageSlider: React.FC<ImageSliderProps> = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const navigate = (direction: 'BACK' | 'NEXT') => {
        if (direction === 'NEXT') {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        } else {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        }
    };

    const renderCustomerImage = useCallback((key: number, image: string, name: string, description: string) => (
        <div
            key={key}
            className="h-[470px] flex justify-center min-w-[310px] xl:h-[600px] xl:min-w-[340px] bg-nsm-gray-100 mx-4 rounded-xl mb-6 relative"
        >
            <img src={image} alt="" />
            <div className='absolute bottom-0 w-full p-3 bg-nsm-gray-300 rounded-b-xl'>
                <div className='text-[22px] pb-2'>{name}</div>
                <ExpandableText text={description} />
            </div>
        </div >
    ), [])

    return (
        <div>
            {images.length > 0 && renderCustomerImage(
                currentIndex,
                images[currentIndex].src,
                images[currentIndex].name,
                images[currentIndex].description
            )}
            <div className='flex flex-row items-center justify-center'>
                <ButtonNavigate direction={"BACK"} onClick={() => navigate('BACK')} />
                <ButtonNavigate direction={"NEXT"} onClick={() => navigate('NEXT')} />
            </div>
        </div>
    );
};

export default ImageSlider;