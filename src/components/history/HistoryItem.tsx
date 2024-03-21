import React from 'react'
import { HistoryItemType } from './types'



const HistoryItem = ({ item }: { item: HistoryItemType }) => {
    const [img1, img2, img3, img4] = item.imageLinks
    return (
        <div>
            <div className='text-lg mx-2'>
                <i>"{item.prompt}"</i>
            </div>
            <div className="flex-col rounded-md">
                <div className='flex'>
                    <div>
                        <img src={img1} alt="" />
                    </div>
                    <div>
                        <img src={img2} alt="" />
                    </div>
                </div>
                <div className='flex'>
                    <div>
                        <img src={img3} alt="" />
                    </div>
                    <div>
                        <img src={img4} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HistoryItem