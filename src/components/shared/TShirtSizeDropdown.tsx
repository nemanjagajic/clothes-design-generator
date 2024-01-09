import React, { useState, useRef, useEffect } from 'react'
import { SizeOption } from '../../store/ItemsContext'

const TShirtSizeDropdown = ({
  onSizeChange,
}: {
  onSizeChange: (size: SizeOption) => void
}) => {
  const [selectedSize, setSelectedSize] = useState<SizeOption>('M') // Default selected size
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null) // Ref for the dropdown

  const sizes: SizeOption[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

  useEffect(() => {
    // Event listener for closing the dropdown when clicking outside of it
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible)
  }

  const handleSizeSelection = (size: SizeOption) => {
    setSelectedSize(size)
    setIsDropdownVisible(false)
    onSizeChange(size)
  }

  return (
    <div className='relative inline-block text-left min-w-[140px] pb-4 md:pl-2 md:pb-0' ref={dropdownRef}>
      <button
        type='button'
        className='inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none'
        onClick={toggleDropdown}
        aria-haspopup='true'
        aria-expanded={isDropdownVisible}
      >
        Veličina: {selectedSize}
        <svg
          className='-mr-1 ml-2 h-5 w-5'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
          aria-hidden='true'
        >
          <path
            fillRule='evenodd'
            d='M5.292 7.292a1 1 0 011.414 0L10 10.586l3.294-3.294a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
            clipRule='evenodd'
          />
        </svg>
      </button>
      {isDropdownVisible && (
        <div
          className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-30'
          role='menu'
          aria-orientation='vertical'
        >
          <div className='py-1' role='none'>
            {sizes.map((size) => (
              <button
                key={size}
                className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100${selectedSize === size ? 'bg-gray-100' : ''
                  }`}
                role='menuitem'
                onClick={() => handleSizeSelection(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default TShirtSizeDropdown
