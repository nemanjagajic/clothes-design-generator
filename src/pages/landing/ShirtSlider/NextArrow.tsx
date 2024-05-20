import { MouseEventHandler } from 'react'
import { ArrowForwardOutline } from 'react-ionicons'

const NextArrow = (props: {
  onClick?: MouseEventHandler<HTMLDivElement>
  className?: any
}) => {
  return (
    <div className={props.className}>
      <div
        className=" group-hover:flex hidden rounded-full bg-white w-[40px] h-[40px] flex items-center justify-center"
        onClick={props.onClick}
      >
        <ArrowForwardOutline
          color={'#0090F8'}
          title={'next-arrow'}
          height="25px"
          width="25px"
        />
      </div>
    </div>
  )
}

export default NextArrow
