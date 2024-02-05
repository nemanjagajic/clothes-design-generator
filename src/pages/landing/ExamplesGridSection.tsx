import React, { useRef } from 'react';
import ImageList from './ImageList';


const prompts = ['Astronaut na mesecu pije koktel',
    'Astronaut surfuje u svemiru',
    'Rep grupa mačića u jaknama, sa sunčanim naočarima',
    'Muški vanzemaljac "Mister univerzuma"',
    '2d morski talasi',
    'DJ Superman na žurci',
    'Renovirane egipatske piramide 3024 godine',
    'Elon musk u tradicionalnoj srpskoj nošnji uskače u kolo',
    'Novak Djokovic se bori sa penzionerima za piletinu u Lidlu',
    'Astronaut kulira uz sok na marsu',
    'Pomeranac u svemiru vija hranu',
    'Sedi žaba sama na listu lokvanja i pije rakiju',
    'Petlovi kao italijanska mafija',
    'Barbie Mona Lisa',
    'Pomeranac vija hranu u svemiru',
    'Apstraktna umetnost u stilu Pabla pikasa, boje crvena, žuta i plava',
    'Vanzemaljac "Miss Univerzuma"',
    'Jutrić kafica sa pogledom',
    'Star Wars tematske poštanske markice',
    'Astronaut na mesecu pije koktel',
    '2D morski talasi',
    'Raphaello from TMNT as a baby',
    'Avengers bebe',
    'Beba Rubeus Hagrid',
    'Beba Draco Malfoy',
    'Beba Ron Weasley'
]


const imagePaths = Array.from({ length: 26 }, (_, index) => {
    return { src: require(`../../assets/examples/${index + 1}.png`), prompt: prompts[index] }

})

const ExamplesGridSection = () => {
    const gridRef = useRef<HTMLDivElement>(null);


    return (
        <div className='flex flex-col p-4 bg-[#FAF9F1] relative pb-20  ' ref={gridRef}>
            <h2 className="w-full text-black text-[44px] sm:text-5xl sm:text-center font-bold leading-tight pb-10 pt-20">
                <span>Šta su drugi ljudi </span>
                <span className="text-light-blue text-[50px] sm:text-5xl font-custom">kreirali</span>
            </h2>
            <ImageList images={imagePaths.concat(imagePaths)} scrollDirection='left' />
            <ImageList images={imagePaths.concat(imagePaths).reverse()} scrollDirection='right' hideOnMobile />

        </div>
    );

};

export default ExamplesGridSection;