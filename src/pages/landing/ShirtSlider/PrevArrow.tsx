import { MouseEventHandler } from 'react'
import { ArrowBackOutline } from 'react-ionicons'

const PrevArrow = (props: {
  onClick?: MouseEventHandler<HTMLDivElement>
  className?: any
}) => {
  return (
    <div className={props.className}>
      <div
        className="rounded-full bg-white w-[40px] h-[40px] flex items-center justify-center"
        onClick={props.onClick}
      >
        <ArrowBackOutline
          color={'#0090F8'}
          title={'next-arrow'}
          height="25px"
          width="25px"
        />
      </div>
    </div>
  )
}

export default PrevArrow
