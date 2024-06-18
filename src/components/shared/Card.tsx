import React from 'react'
import {
  ChevronBackOutline,
  ChevronForwardOutline,
  CloseOutline,
} from 'react-ionicons'
import { ColorOption, colorOptions } from '../../constants'
import {
  Gender,
  Item,
  SizeOption,
  genderToLabel,
} from '../../store/ItemsContext'
import ColorCircle from './ColorCircle'
// @ts-ignore
import whiteTshirt from '../../assets/images/white-tshirt.png'

interface ProductCardProps {
  imageUrl: string
  price: number
  quantity: number
  onAdd: () => void
  onRemove: () => void
  size: SizeOption
  color: Item['color']
  gender: Gender
  onRemoveAll: () => void
  shirtSrc: string
}

const Card: React.FC<ProductCardProps> = ({
  imageUrl,
  price,
  quantity,
  size,
  gender,
  color,
  onAdd,
  onRemove,
  onRemoveAll,
  shirtSrc,
}) => {
  return (
    <div className="m-3 flex flex-col items-center bg-white">
      <div className="flex m2 rounded-md overflow-hidden relative">
        <div className="text-end w-full absolute">
          <button
            onClick={onRemoveAll}
            className="font-bold py-2 px-4 rounded-full mx-3"
          >
            <CloseOutline
              color={'gray'}
              title={''}
              height="25px"
              width="25px"
            />
          </button>
        </div>
        <img width={300} src={shirtSrc} />
        <img
          className="absolute rounded-md top-[80px] left-[90px] secure"
          width={120}
          src={imageUrl}
        />
      </div>
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-center">
          <button onClick={onRemove}>
            <ChevronBackOutline
              color={'#0090f8'}
              title={''}
              height="20px"
              width="20px"
            />
          </button>
          <p className="mx-3 font-bold">{quantity}</p>
          <button onClick={onAdd}>
            <ChevronForwardOutline
              color={'#0090f8'}
              title={''}
              height="20px"
              width="20px"
            />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center w-full">
        <div className="m-1 flex items-center">
          <div className="text-gray-700 text-md mx-2">Boja:</div>
          <div className="text-center flex justify-center">
            <ColorCircle
              color={color}
              type="passive"
              bgClass={colorOptions[color as ColorOption]}
              size={'md'}
            />
          </div>
        </div>
        <div className="m-1 flex items-center">
          <div>
            <p className="text-gray-700 text-md mx-2">Veličina:</p>
          </div>
          <div className="text-center">
            <p>{size}</p>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="m-1 flex items-center">
          <div>
            <p className="text-gray-700 text-md mx-2">Pol:</p>
          </div>
          <div className="text-center">
            <p>{genderToLabel[gender]}</p>
          </div>
        </div>
        <div className="m-1 flex items-center">
          <div>
            <p className="text-gray-700 text-md mx-2">Cena:</p>
          </div>
          <div className="text-center">
            {quantity > 1 ? (
              <p>{`${quantity} x ${price}`}rsd</p>
            ) : (
              <p>{`${price}`}rsd</p>
            )}
          </div>
        </div>
      </div>
      <div className="w-full ">
        <hr className="border-gray-200 overflow-y-hidden" />
      </div>
    </div>
  )
}

export default Card
