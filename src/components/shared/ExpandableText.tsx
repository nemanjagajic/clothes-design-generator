import React, { useState } from 'react';

interface Props {
    text: string;
    maxLength: number;
}

const ExpandableText: React.FC<Props> = ({ text, maxLength }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleIsExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
            <div className={`transition-height duration-300 ease-in-out overflow-scroll ${isExpanded ? 'max-h-screen' : 'max-h-[4.5rem]'}`}>
                <p>{text}</p>
            </div>
            {text.length > maxLength && (
                <button
                    onClick={toggleIsExpanded}
                    className="ml-2 mt-2 text-gray-600 cursor-pointer"
                >
                    {isExpanded ? 'See Less' : 'See More'}
                </button>
            )}
        </div>
    );
};

export default ExpandableText;
