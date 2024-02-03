import React, { useEffect, useRef, useState } from 'react';

interface ImageListProps {
    images: string[];
    scrollDirection: 'left' | 'right';
}

const ImageList: React.FC<ImageListProps> = ({ images, scrollDirection }) => {
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
            className=" overflow-hidden w-full"

        >
            <div className="flex flex-row">
                {images.concat(images).map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Image ${index}`}
                        className='p-2 rounded-xl transition duration-500 ease-in-out transform hover:scale-105 hover:z-20 rounded-xl w-[400px]'
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />

                ))}
            </div>
        </div>
    );
};

export default ImageList;
