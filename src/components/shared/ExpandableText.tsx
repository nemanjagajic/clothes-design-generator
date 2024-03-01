import React, { useState } from 'react';

interface ExpandableTextProps {
    text: string;
}

const ExpandableText: React.FC<ExpandableTextProps> = ({ text }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const shouldTruncate = text.length > 130;
    const displayText = isExpanded || !shouldTruncate ? text : `${text.substring(0, 97)}...`;

    return (
        <div>
            <p>{displayText}</p>
            {shouldTruncate && (
                <button
                    className="mt-2 text-blue-500 hover:text-blue-700 transition-colors duration-200"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? 'Smanji' : 'Prikaži više'}
                </button>
            )}
        </div>
    );
};

export default ExpandableText;
