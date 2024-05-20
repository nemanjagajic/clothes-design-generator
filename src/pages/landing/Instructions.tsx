import React from 'react'

const InstructionSection = () => {
  const renderStep = (step: number, text: string) => {
    return (
      <div className="flex-1 flex-col p-4 rounded-lg bg-nsm-gray-300">
        <div className="flex items-center justify-center w-[50px] h-[50px] bg-nsm-gray-100 rounded-full">
          <span className="text-[32px] text-light-blue">{step}</span>
        </div>
        <p className="mt-4 text-gray-700">{text}</p>
      </div>
    )
  }

  return (
    <div className="bg-nsm-gray-100 flex flex-col items-center pt-20 pb-10 px-4 w-full">
      <div className="sm:max-w-[1440px] w-full  md:px-8 lg:px-16 xl:px-32">
        <h2 className="text-black text-[44px] sm:text-5xl sm:text-center font-bold leading-tight pb-10">
          <span>Prati korake kako bi i ti</span>
          <div>
            <span className="text-[50px] italic text-light-blue">
              napravio svoju
            </span>
            <span> unikatnu majicu</span>
          </div>
        </h2>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 ">
          {renderStep(
            1,
            'Razmisli i opiši dizajn za majicu u polje za unost teksta ispod.',
          )}
          {renderStep(
            2,
            "Pritisni dugme 'Generiši' i za pola minuta dobijaš vizual tvoje majice.",
          )}
          {renderStep(
            3,
            'Odaberi jednu od četiri ponuđene fotke, boju majice, veličinu i dodaj u korpu.',
          )}
        </div>
      </div>
    </div>
  )
}

export default InstructionSection
