import React, { useEffect, useRef, useState } from 'react';
import ImageItem from './ImageItem';

interface ImageListProps {
    images: { src: string, prompt: string }[];
    scrollDirection: 'left' | 'right';
    hideOnMobile?: boolean
}

const ImageList: React.FC<ImageListProps> = ({ images, scrollDirection, hideOnMobile = false }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        let isScrolling: boolean;

        const scrollStep = () => {
            if (!isScrolling || isPaused) return;

            const scrollIncrement = scrollDirection === 'right' ? -.5 : .5;
            scrollContainer.scrollLeft += scrollIncrement;

            if (scrollContainer.scrollLeft <= 0) {
                scrollContainer.scrollLeft = scrollContainer.scrollWidth / 2;
            } else if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
                scrollContainer.scrollLeft = 0;
            }

            requestAnimationFrame(scrollStep);
        };

        isScrolling = true;
        requestAnimationFrame(scrollStep);

        return () => {
            isScrolling = false;
        };
    }, [scrollDirection, isPaused]);


    const handleMouseEnter = (e: any) => {
        setIsPaused(true)
    };
    const handleMouseLeave = (e: any) => {
        setIsPaused(false)
    };

    return (
        <div
            ref={scrollContainerRef}
            className={`flex w-full overflow-x-scroll scrollbar-hide ${hideOnMobile ? 'hidden' : ''} md:block`}
        >
            <div className="flex flex-nowrap ">
                {images.map((image, index) => (
                    <>
                        <ImageItem
                            image={image.src}
                            key={index}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            prompt={image.prompt}
                        />
                    </>
                ))}
            </div>

        </div >
    );
};

export default ImageList;
