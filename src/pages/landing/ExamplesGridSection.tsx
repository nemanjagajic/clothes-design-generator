import React, { useRef } from 'react';
import ImageList from './ImageList';

const imagePaths = Array.from({ length: 19 }, (_, index) =>
    require(`../../assets/examples/${index + 1}.png`)
)
const firstHalf = imagePaths.slice(0, 10);
const secondHalf = imagePaths.slice(10, 19);

const ExamplesGridSection = () => {
    const gridRef = useRef<HTMLDivElement>(null);

    const lampStyle = {
        background: `rgba(0, 0, 0, 0.4) 360px`,
        zIndex: 10
    };
    return (
        <div className='flex flex-col p-4 bg-black relative' ref={gridRef}>
            <ImageList images={firstHalf} scrollDirection='left' />
            <ImageList images={secondHalf} scrollDirection='right' />

            <div className="absolute inset-0 pointer-events-none" style={lampStyle}></div>

        </div>
    );

};

export default ExamplesGridSection;