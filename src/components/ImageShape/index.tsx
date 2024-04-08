import { FC } from 'react'
import { TabletPortraitOutline } from 'react-ionicons'
import { SquareOutline } from 'react-ionicons'

interface ImageShapeProps {
  shape: 'square' | 'rectangle'
  onChange: (shape: 'square' | 'rectangle') => void
}

const ImageShape: FC<ImageShapeProps> = ({ shape, onChange }) => {
  return (
    <div className="flex items-center">
      <div onClick={() => onChange('rectangle')} className="mr-4">
        <TabletPortraitOutline
          color={shape === 'rectangle' ? '#0090f9' : '#00000'}
          title={'rectangle'}
          height="50px"
          width="50px"
        />
      </div>
      <div onClick={() => onChange('square')}>
        <SquareOutline
          color={shape === 'square' ? '#0090f9' : '#00000'}
          title={'square'}
          height="50px"
          width="50px"
        />
      </div>
    </div>
  )
}

export default ImageShape
