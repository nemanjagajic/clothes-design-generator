import React, { useState, useEffect } from 'react';

function TypingAnimation({ text = "", speed = 100 }) {
    const [content, setContent] = useState("");
    const [index, setIndex] = useState(0); // Use state to keep track of the index

    useEffect(() => {
        if (index >= text.length) return; // Stop the effect if the end of the text is reached

        const timer = setTimeout(() => { // Use setTimeout instead of setInterval
            setContent((prevContent) => prevContent + text.charAt(index)); // Add the next character
            setIndex(index + 1); // Increment the index for the next character
        }, speed);

        return () => clearTimeout(timer); // Cleanup the timer when the component unmounts or the index changes
    }, [index, text, speed]); // Depend on index, text, and speed

    return <div>{content}</div>;
}

export default TypingAnimation;
