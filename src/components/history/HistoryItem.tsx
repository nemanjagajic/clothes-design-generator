import React from 'react'
import { HistoryItemType } from './types'

const HistoryItem = ({ item }: { item: HistoryItemType }) => {
  
  
  return (
    <div>
      <div className="text-lg mx-2">
        <i>"{item.prompt}"</i>
      </div>
      <div className="flex-col rounded-md">
        <img className="secure" src={item.imagesLink} alt="" />
      </div>
    </div>
  )
}

export default HistoryItem
