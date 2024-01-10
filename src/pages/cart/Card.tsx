import React from 'react'
import {
    ChevronBackOutline,
    ChevronForwardOutline,
    RemoveCircleOutline,
} from 'react-ionicons'
import { ColorOption, colorOptions } from '../../constants'
import { Gender, Item, SizeOption, genderToLabel } from '../../store/ItemsContext'
import ColorCircle from '../../components/shared/ColorCircle'

interface ProductCardProps {
    imageUrl: string | null
    price: number
    quantity: number
    onAdd: () => void
    onRemove: () => void
    size: SizeOption
    color: Item['color']
    gender: Gender
    onRemoveAll: () => void
}

const Card: React.FC<ProductCardProps> = ({
    imageUrl,
    price,
    quantity,
    size,
    color,
    onAdd,
    onRemove,
    gender,
    onRemoveAll
}) => {
    return (
        <div className='my-1 flex items-center bg-white'>
            <div className='flex shadow-lg my-4 mr-4 rounded-md overflow-hidden'>
                <img src={imageUrl!} width={'150px'} alt='Product' />
            </div>
            <table>
                <tr>
                    <td className="text-left"><p className='text-gray-700 text-md'>Količina:</p></td>
                    <td className="text-left">
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
                        </div></td>
                </tr>
                <tr>
                    <td>
                        <p className='text-gray-700 text-md'>Veličina:</p>
                    </td>
                    <td className="text-left"><p className='ml-3'>{size}</p></td>
                </tr>
                <tr>
                    <td><p className='text-gray-700 text-md'>Boja:</p></td>
                    <td><div className='flex items-center ml-3'>
                        <ColorCircle
                            color={color}
                            type='passive'
                            bgClass={colorOptions[color as ColorOption]}
                            size={'5'}
                        />
                    </div></td>
                </tr>
                <tr>
                    <td>
                        <p className='text-gray-700 text-md'>Tip:</p>
                    </td>
                    <td className="text-left"><p className='ml-3 '>{genderToLabel[gender]}</p></td>
                </tr>
                <tr>
                    <td>
                        <p className='text-gray-700 text-md'>Cena:</p>
                    </td>
                    <td className="text-left"><p className='ml-3 '>{price * quantity}rsd</p></td>
                </tr>

            </table>
            <button onClick={onRemoveAll} className='font-bold py-2 px-4 rounded-full'>
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
