import { useState } from 'react'
import EmailButton from '../shared/EmailButton'
import EmailInput from '../shared/EmailInput'

const EmailCard = () => {
  const [isValid, setIsValid] = useState(true)
  const [email, setEmail] = useState('')
  return (
    <div className='p-4 flex-col items-center justify-center mt-8 bg-[#edf7ed] border-2 shadow-md  rounded-md w-full'>
      <h3 className='text-xl font-bold text-[#1e4620]'>
        📬 Ne želis da čekaš?
      </h3>
      <p className='text-[#1e4620] w-full p-2'>
        Ostavi nam svoj e-mail i poslaćemo ti tvoju kreaciju kada bude gotova:
      </p>
      <div className='flex justify-between items-start'>
        <EmailInput
          customStyle='w-full mr-8'
          email={email}
          setEmail={setEmail}
          isValid={isValid}
          setIsValid={setIsValid}
        />
        <EmailButton
          label={'Pošalji'}
          onClick={() => {}}
          disabled={!isValid || !email}
        />
      </div>
    </div>
  )
}

export default EmailCard
