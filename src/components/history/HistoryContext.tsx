import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { sliceImageIntoUrls } from '../../utils/imageSlicer';

export interface HistoryItem {
    prompt: string;
    imagesLink: string;
}

interface HistoryContextType {
    history: HistoryItem[];
    addHistoryItem: (item: HistoryItem) => void;
    currentImages: string[]
    setCurrentImages: (currentImages: string[]) => void
    updateCurrentImages: (imageUrl: string) => void
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const useHistory = () => {
    const context = useContext(HistoryContext);
    if (!context) {
        throw new Error('useHistory must be used within a HistoryProvider');
    }
    return context;
};

const HistoryProvider = ({ children }: { children: ReactNode }) => {
    const [history, setHistory] = useState<HistoryItem[]>(() => {
        const storedHistory = localStorage.getItem('imgHistory');
        return storedHistory ? JSON.parse(storedHistory) : [];
    });

    const [currentImages, setCurrentImages] = useState<string[]>([])


    useEffect(() => {
        localStorage.setItem('imgHistory', JSON.stringify(history));
    }, [history]);

    const addHistoryItem = (item: HistoryItem) => {
        setHistory(prevHistory => {
            const newHistory = [...prevHistory, item];
            if (newHistory.length > 20) {
                newHistory.shift();
            }
            return newHistory;
        });
    };

    const updateCurrentImages = (mainImageUrl: string) => {
        localStorage.setItem('mainImage', mainImageUrl)
        sliceImageIntoUrls(mainImageUrl).then(urls=> {
            setCurrentImages(urls)
        })
    }

    return (
        <HistoryContext.Provider value={{ history, addHistoryItem, currentImages, updateCurrentImages, setCurrentImages }}>
            {children}
        </HistoryContext.Provider>
    );
};

export default HistoryProvider;
