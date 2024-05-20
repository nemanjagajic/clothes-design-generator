import StarIcon from '../../../components/icons/StarIcon'

interface SliderItemProps {
  src: string
  shirtSrc?: string
  prompt: string
}

const SliderItem = ({ src, prompt, shirtSrc }: SliderItemProps) => {
  return (
    <div className="mx-2">
      <div
        className="rounded-lg
           bg-[#001D38]
           relative
           overflow-hidden
           h-[400px]
           w-[320px]
           sm:w-[400px]
           border
           overflow-hidden
           border-light-blue
        "
      >
        <div className="w-full">
          {shirtSrc && (<div
            className="
              w-[400px]
              sm:w-[500px]
              left-[-40px]
              top-[40px]
              sm:left-[-50px]
              sm:top-[20px]
              overflow-hidden
              absolute
            "
          >
            <img src={shirtSrc} />
          </div>)}
          <div
            className="
              absolute 
              w-[190px]
              sm:w-[230px] 
              top-[130px] 
              left-[60px]
              sm:left-[80px]
             "
          >
            <img className="rounded-md secure" src={src} />
          </div>
        </div>
      </div>

      <div className="relative inline-flex">
        <div
          className="
            absolute
            bottom-[40px]
            sm:bottom-[30px]
            transitiona-all
            bg-light-blue
            rounded-xl
            blur-lg
            -inset-1
          "
        ></div>
        <div
          className="
            relative
            border-[3px]
            left-[10px]
            w-[300px]
            sm:w-[380px]
            border-light-blue
            max-h-[60px]
            bottom-[40px]
            sm:bottom-[30px]
            text-lg
            bg-white
            flex
            justify-start
            items-center
            px-2
            py-4
            text-md
            rounded-xl"
        >
          <div className="relative left-[0px] mr-2">
            <StarIcon color={'#0090F8'} />
          </div>
          <div>{prompt}</div>
        </div>
      </div>
    </div>
  )
}

export default SliderItem
