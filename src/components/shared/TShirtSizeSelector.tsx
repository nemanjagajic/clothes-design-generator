import React, { useMemo, useState } from 'react'
import { SizeOption } from '../../store/ItemsContext'

interface SizeSelectorProps {
  onSizeChange: (size: SizeOption) => void
  type: "male" | "female"
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ onSizeChange, type }) => {
  const sizes: SizeOption[] = useMemo(() => {
    console.log("Type bato ", type)
    if (type === 'male') {
      return ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL']
    }
    return ['XS','S', 'M', 'L', 'XL', 'XXL']
  }, [type])


  const [selectedSize, setSelectedSize] = useState<SizeOption>('L')

  const handleSizeChange = (size: SizeOption) => {
    setSelectedSize(size)
    onSizeChange(size)
  }

  return (
    <div className="flex flex-wrap justify-start gap-2 ">
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
