import StarIcon from '../../../components/icons/StarIcon'

interface SliderItemProps {
  src: string
  shirtSrc: string
  prompt: string
}

const SliderItem = ({ src, prompt, shirtSrc }: SliderItemProps) => {
  return (
    <div className="mx-2  ">
      <div className="rounded-lg bg-[#001D38] relative overflow-hidden w-[350px] sm:w-[400px] h-[400px] border overflow-hidden border-light-blue w-[350px] sm:w-[400px] h-[400px]">
        <div className="w-full">
          <div className="w-[500px] sm:w-[550px] overflow-hidden absolute left-[-80px] top-[40px]">
            <img src={shirtSrc} />
          </div>
          <div
            className="
            absolute 
            w-[220px]
            sm:w-[230px] 
            top-[130px] 
            left-[60px]
            sm:left-[80px]
          "
          >
            <img className="rounded-md" src={src} />
          </div>
        </div>
      </div>

      <div className="relative inline-flex">
        <div className="absolute bottom-[40px] sm:bottom-[30px] transitiona-all bg-light-blue rounded-xl blur-lg -inset-1"></div>
        <div className="relative border-2 left-[10px] w-[330px] sm:w-[380px] border-light-blue  max-h-[60px] bottom-[40px] sm:bottom-[30px] text-lg bg-white flex justify-start items-center px-2 py-4 text-md rounded-md">
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
