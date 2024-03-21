// Timer.tsx
import React, { useEffect, useState } from 'react';

interface TimerProps {
    onTimeout: () => void; // Callback to be called after 12 hours
    seconds: number
}

const Timer: React.FC<TimerProps> = ({ onTimeout, seconds }) => {
    const [secondsLeft, setSecondsLeft] = useState(seconds);


    useEffect(() => {
        // Set up an interval that ticks every second
        const intervalId = setInterval(() => {
            setSecondsLeft((prevSecondsLeft) => {
                // When it reaches zero, clear the interval and call the timeout callback
                if (prevSecondsLeft === 1) {
                    clearInterval(intervalId);
                    onTimeout();
                }
                return prevSecondsLeft - 1;
            });
        }, 1000);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, [onTimeout]); // Only re-run if onTimeout changes


    // Format the seconds into HH:MM:SS
    const formatTime = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex-col items-center justify-center">
            <div className="flex items-center justify-center rounded-tl-lg rounded-tr-lg w-[230px] h-16 bg-white shadow-black">
                <p className="text-xl text-center font-bold text-gray-800">
                    Dostigao si limit od 5 pokušaja. Nastavi za:
                </p>
            </div>
            <div className="flex items-center justify-center rounded-bl-lg rounded-br-lg w-[230px] h-16 bg-dark-blue shadow-black">
                <p className="text-4xl font-bold text-white">
                    {formatTime(secondsLeft)}
                </p>
            </div>
        </div>
    );
};

export default Timer;
