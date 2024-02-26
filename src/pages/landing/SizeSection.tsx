import React, { useState } from 'react';
import SizeChart from './SizeChart';
// @ts-ignore
import blackTShirtWithArrows from '../../assets/images/black-tshirt-with-arrows.png'
import ToggleButton from '../../components/shared/ToggleButton';


const SizeSection = () => {
    const [gender, setGender] = useState<"male" | "female">("male")
    const handleToggleChange = (type: "male" | "female") => {
        setGender(type)
    }

    return (
        <div id='tShirtSizes' className='bg-nsm-gray-300 w-full h-full px-4 md:px-8 lg:px-16 xl:px-32 flex flex-col items-center pb-8'>
            <h2 className="text-black text-[44px] sm:text-5xl sm:text-center font-bold leading-tight pb-10 pt-24">
                Veličine
            </h2>

            <div className='mt-10 flex justify-center items-center flex-col md:flex-row '>
                <div className='md:mr-8  sm:block'>
                    <img width={350} src={blackTShirtWithArrows} />
                </div>
                <div>
                    <ToggleButton leftOption="Muško" rightOption="Žensko" onChange={handleToggleChange} />
                    <SizeChart gender={gender} />
                </div>
            </div>
        </div>
    )
}

export default SizeSection