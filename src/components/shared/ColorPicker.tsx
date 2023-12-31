import React, { useState } from 'react'
import { ColorOption, colorOptions } from '../../constants'
import { Item } from '../../store/ItemsContext'
import ColorCircle from './ColorCircle'

interface ColorPickerProps {
  onColorPick: (color: Item['color']) => void
}

const ColorPicker = ({ onColorPick }: ColorPickerProps) => {
  const [selectedColor, setSelectedColor] = useState<string>('white')

  const handleClick = (color: string) => {
    setSelectedColor(color)
    onColorPick(color)
  }

  return (
    <div className='flex space-x-2 py-4'>
      {Object.keys(colorOptions).map((color: Item['color']) => (
        <>
          <ColorCircle
            type={'active'}
            size={'20'}
            color={color}
            bgClass={colorOptions[color as ColorOption]}
            selected={selectedColor === color}
            onClick={() => handleClick(color)}
          />
        </>
      ))}
    </div>
  )
}

export default ColorPicker
