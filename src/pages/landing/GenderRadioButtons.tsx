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
            <label className="flex items-center space-x-2">
                <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === 'male' as Gender}
                    onChange={() => setGender('male' as Gender)}
                    className="form-radio h-5 w-5 text-light-blue-500" // Adjusted size
                />
                <span className="text-lg">Muški</span>
            </label>

            <label className="flex items-center space-x-2">
                <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === 'female' as Gender}
                    onChange={() => setGender('female' as Gender)}
                    className="form-radio h-5 w-5 text-light-blue-500" // Adjusted size
                />
                <span className="text-lg">Ženski</span>
            </label>
        </div>
    );
};

export default GenderRadioButtons;
