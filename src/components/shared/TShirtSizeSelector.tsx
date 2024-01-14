import React, { useState } from 'react'
import { SizeOption } from '../../store/ItemsContext'

interface SizeSelectorProps {
  onSizeChange: (size: SizeOption) => void
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ onSizeChange }) => {
  const sizes: SizeOption[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] // Define the available sizes
  const [selectedSize, setSelectedSize] = useState<SizeOption>('L') // Initial selected size

  const handleSizeChange = (size: SizeOption) => {
    setSelectedSize(size)
    onSizeChange(size)
  }

  return (
    <div className="flex space-x-2">
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => handleSizeChange(size)}
          className={`px-4 py-2 rounded border border-nsm-gray-500 ${
            selectedSize === size
              ? 'bg-light-blue text-white'
              : 'bg-white text-gray-700 border-gray-300'
          }`}
        >
          {size}
        </button>
      ))}
    </div>
  )
}

export default SizeSelector
