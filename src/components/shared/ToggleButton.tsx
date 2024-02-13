import React, { useState } from 'react';

interface ToggleButtonProps {
    leftOption: string;
    rightOption: string;
    onChange: (value: "male" | "female") => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ leftOption, rightOption, onChange }) => {
    const [selected, setSelected] = useState<"male" | "female">('male');

    const handleToggle = (value: "male" | "female") => {
        setSelected(value);
        onChange(value);
    };

    return (
        <div className="flex justify-center items-center p-4 w-full ">
            <div className='w-full sm:w-[484px] h-[70px] bg-[#ECEBE4] p-1 rounded-md'>
                <button
                    className={`w-1/2 h-full px-6 py-2 text-md font-medium rounded-sm ${selected === 'male' ? 'bg-[#0090F8] text-white' : 'bg-[#E3E3E3] text-[#0090F8]'
                        } focus:outline-none`}
                    onClick={() => handleToggle('male')}
                >
                    {leftOption}
                </button>
                <button
                    className={`w-1/2  h-full px-6 py-2 text-md font-medium rounded-sm ${selected === 'female' ? 'bg-[#0090F8] text-white' : 'bg-[#E3E3E3] text-[#0090F8]'
                        } focus:outline-none`}
                    onClick={() => handleToggle('female')}
                >
                    {rightOption}
                </button>
            </div>
        </div>
    );
};

export default ToggleButton;
