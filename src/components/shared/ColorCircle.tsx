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
  onClick = () => {},
  selected = false,
  size = '10',
}: ColorCircleProps) => {
  return (
    <button
      key={color}
      disabled={type === 'passive'}
      className={`h-${size} w-${size} rounded-full ${bgClass} ${
        selected ? 'ring-4' : 'ring-2'
      }`}
      onClick={() => onClick(color)}
      aria-label={`Select ${color}`}
    />
  )
}

export default ColorCircle
