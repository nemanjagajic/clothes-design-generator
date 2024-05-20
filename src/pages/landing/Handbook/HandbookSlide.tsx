import StarIcon from '../../../components/icons/StarIcon'

interface HandbookSlideProps {
  src: string
  prompt: string
  color: string
}

const HandbookSlide = ({ src, prompt, color }: HandbookSlideProps) => {
  return (
    <div>
      <img
        alt=""
        src={src}
        className="
          secure
          sm:w-[350px]
          sm:h-[350px]
          md:w-[400px]
          md:h-[400px]
          lg:w-[450px]
          lg:h-[450px]
          w-[320px]
          h-[320px]
          rounded-md
          "
      />
      <div
        style={{ borderColor: color }}
        className={`
                    relative
                    border-[3px]
                    left-[10px]
                    max-w-[calc(100%-20px)]
                    
                    max-h-[60px]
                    bottom-[70px]
                    sm:bottom-[70px]
                    bg-white
                    flex
                    justify-start
                    items-center
                    px-2
                    py-2
                    text-base
                    rounded-xl`}
      >
        <div className="relative left-[0px] mr-2">
          <StarIcon color={'#0090F8'} />
        </div>
        <div>{prompt}</div>
      </div>
    </div>
  )
}

export default HandbookSlide
