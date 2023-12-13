import React, { ChangeEvent, MouseEvent } from 'react'
import {
  ChevronBackOutline,
  ChevronForwardOutline,
  RemoveCircleOutline,
} from 'react-ionicons'
import { ColorOption, colorOptions } from '../../constants'
import { Item, SizeOption } from '../../store/ItemsContext'
import ColorCircle from './ColorCircle'

interface ProductCardProps {
  imageUrl: string
  price: string
  quantity: number
  onAdd: () => void
  onRemove: () => void
  size: SizeOption
  color: Item['color']
}

const Card: React.FC<ProductCardProps> = ({
  imageUrl,
  price,
  quantity,
  size,
  color,
  onAdd,
  onRemove,
}) => {
  return (
    <div className='m-3 flex items-center bg-white'>
      <div className='flex shadow-lg m-4 rounded-md overflow-hidden'>
        <img src={imageUrl} width={'200px'} height={'200px'} alt='Product' />
      </div>
      <div className='w-full'>
        <div className='flex justify-between items-center w-full'>
          <p className='text-gray-700 text-md'>Količina:</p>
          <div className='flex items-center justify-center'>
            <button onClick={onRemove}>
              <ChevronBackOutline
                color={'#0090f8'}
                title={''}
                height='20px'
                width='20px'
              />
            </button>
            <p className='mx-3 font-bold'>{quantity}</p>
            <button onClick={onAdd}>
              <ChevronForwardOutline
                color={'#0090f8'}
                title={''}
                height='20px'
                width='20px'
              />
            </button>
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <p className='text-gray-700 text-md'>Veličina:</p>
          <p className='mx-3 font-bold'>{size}</p>
        </div>
        <div className='flex justify-between items-center'>
          <p className='text-gray-700 text-md'>Boja:</p>
          <div className='mx-3 font-bold flex  items-center'>
            <ColorCircle
              color={color}
              type='passive'
              bgClass={colorOptions[color as ColorOption]}
              size={'10'}
            />
          </div>
        </div>
      </div>

      <button onClick={onRemove} className='font-bold py-2 px-4 rounded-full'>
        <RemoveCircleOutline
          color={'red'}
          title={''}
          height='25px'
          width='25px'
        />
      </button>
    </div>
  )
}

export default Card
