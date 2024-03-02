import React, { useCallback, useState } from "react";
import ButtonNavigate from "./ButtonNavigate";
import ExpandableText from "./ExpandableText";
//@ts-ignore
import minja from '../../assets/testimonials/minja.png'
//@ts-ignore
import vlada from '../../assets/testimonials/vlada.png'
//@ts-ignore
import nemanja from '../../assets/testimonials/nemanja.png'

interface Image {
    src: string;
    name: string;
    description: string;
}

interface ImageSliderProps {
}

const images = [
    { prompt: "Apstraktna slika brke", name: "Minja Brka", src: minja, description: "Kupio sam majicu sa sopstvenim dizajnom i rezultat je top. Kvalitet pamuka je top, a print je savršen - oštar i živopisan." },
    { prompt: "Astronaut jaše konja u svemiru", name: "Vladimir", src: vlada, description: "Bilo je jako zabavno kreirati sopstveni print, nešto unikatno što niko na svetu nema. Kao da su po meni krojili majicu, jako je udobna i kvalitet se oseti na dodir. Sve preporuke!" },
    { prompt: "Čovek i priroda kroz VR", name: "Nemanja", src: nemanja, description: "Oduševljen sam majicom koju sam dizajnirao koristeći nosi šta misliš - proces je bio jednostavan, a rezultat impresivan. Kvalitet štampe i materijala je izvanredan, što čini ovu majicu posebnom u mojoj kolekciji." }
]


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
            className="h-[470px] flex justify-center min-w-[300px] xl:h-[600px] xl:min-w-[340px] bg-nsm-gray-100 mx-4 rounded-xl mb-6 relative"
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