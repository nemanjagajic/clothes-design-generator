import GeneratingLoader from "./GeneratingLoader";

interface ShirtWithPrintProps {
    shirtSrc: string;
    printSrc: string
    onClick: () => void
    isLoading: boolean
}

const ShirtWithPrint = ({ shirtSrc, printSrc, onClick, isLoading }: ShirtWithPrintProps) => {
    return (
      <div className="relative">
        <img
          width={400}
          alt=""
          src={shirtSrc}
          className="px-2 mb-8"
        />
       {!isLoading ? ( 
        <img
          alt=""
          className={`
          max-w-[44%] max-h-[255px]
          max-h-[255px]
          absolute 
          top-[20%] left-[27%] 
          sm:mb-40 mr-1 sm:mr-2 cursor-pointer`}
          onClick={onClick}
          src={printSrc}
        /> ) : (
          <div className="absolute sm:top-[90px] sm:left-[110px] left-[95px] top-[80px]">
            <GeneratingLoader />
          </div>
        )}
      </ div>
    )
}

export default ShirtWithPrint