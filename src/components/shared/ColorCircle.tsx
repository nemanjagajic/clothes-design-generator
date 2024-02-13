import { Item } from '../../store/ItemsContext'

export type ColorCircleType = 'active' | 'passive'

type ColorCircleProps = {
  color: Item['color']
  bgClass: string
  type?: ColorCircleType
  onClick?: (color: Item['color']) => void
  selected?: boolean
  size?: string
}

const ColorCircle = ({
  color,
  bgClass,
  type = 'active',
  onClick = () => { },
  selected = false,
  size = 'md',
}: ColorCircleProps) => {
  return (
    <button
      key={color}
      disabled={type === 'passive'}
      className={`h-10 w-10 rounded-full ${bgClass} ${selected ? 'ring-4' : 'ring-2'} ${size === 'md' ? 'h-5 w-5' : 'h-10 w-10'}`}
      onClick={() => onClick(color)}
      aria-label={`Select ${color}`}
    />
  )
}

export default ColorCircle
