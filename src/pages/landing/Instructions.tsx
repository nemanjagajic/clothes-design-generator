import React from 'react';

const InstructionSection = () => {
  const renderStep = (step: number, text: string) => {
    return (
      <div className="flex-1 flex-col p-4 rounded-lg bg-nsm-gray-100">
        <div className="flex items-center justify-center w-[50px] h-[50px] bg-nsm-gray-300 rounded-full">
          <span className="text-[32px] text-light-blue">{step}</span>
        </div>
        <p className="mt-4 text-gray-700">
          {text}
        </p>
      </div>
    )
  }

  return (
    <div className="bg-nsm-gray-300 flex flex-col items-center pt-40 pb-10 px-5">
      <h2 className='text-black text-[44px] sm:text-5xl sm:text-center font-bold leading-tight pb-10'>
        <span>
          Prati korake kako bi i ti
        </span>
        <div>
        <span className='italic text-light-blue'>napravio svoju</span>
        <span>
          {' '} unikatnu majicu
        </span>
        </div>
      </h2>
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        {renderStep(1, 'Razmisli i opiši dizajn za majicu u polje za unost teksta ispod.')}
        {renderStep(2, 'Pritisni dugme \'Generiši\' i za minut dobijaš vizual tvoje majice.')}
        {renderStep(3, 'Odaberi jednu od četiri ponuđene fotke, boju majice, veličinu i dodaj u korpu.')}
      </div>
    </div>
  );
}

export default InstructionSection;
