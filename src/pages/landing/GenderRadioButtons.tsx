import React, { useEffect, useState } from 'react';
import './GenderRadioButtons.css'; // Import the custom CSS
import { Gender } from '../../store/ItemsContext';

type GenderRadioBUttonProps = {
    onChange: (gender: Gender) => void
}

const GenderRadioButtons = ({ onChange }: GenderRadioBUttonProps) => {
    const [gender, setGender] = useState<Gender>('male' as Gender);

    useEffect(() => {
        onChange(gender)
    }, [gender])


    return (
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setGender('male' as Gender)}
            className={`px-4 py-2 rounded ${gender === 'male' ? 'bg-light-blue text-white' : 'bg-white text-gray-700 border border-nsm-gray-500'}`}
          >
            Musko
          </button>
          <button
            onClick={() => setGender('female' as Gender)}
            className={`px-4 py-2 rounded ${gender === 'female' ? 'bg-light-blue text-white' : 'bg-white text-gray-700 border border-nsm-gray-500'}`}
          >
            Zensko
          </button>
        </div>
    );
};

export default GenderRadioButtons;
