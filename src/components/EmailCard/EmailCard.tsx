import axios from 'axios'
import { FormEventHandler, useState } from 'react'
import EmailButton from '../shared/EmailButton'
import EmailInput from '../shared/EmailInput'

type EmailCardProps = {
  userId: string
}

const EmailCard = ({ userId }: EmailCardProps) => {
  const [isValid, setIsValid] = useState(true)
  const [email, setEmail] = useState('')

  const handleEmailSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    axios
      .post(`${process.env.REACT_APP_BE_API_URL}/email-refs`, {
        data: {
          email,
          ref: userId,
        },
      })
      .then((data) => {
        // console.log('Email saved', data)
      })
      .catch((error) => {
        // console.log('Error sending mail', error)
      })
  }

  return (
    <form
      onSubmit={handleEmailSubmit}
      className="p-4 flex-col items-center justify-center mt-8 bg-[#edf7ed] border-2 shadow-md  rounded-md w-full"
    >
      <h3 className="text-xl font-bold text-[#1e4620]">
        📬 Ne želis da čekaš?
      </h3>
      <p className="text-[#1e4620] w-full p-2">
        Ostavi nam svoj e-mail i poslaćemo ti tvoju kreaciju kada bude gotova:
      </p>
      <div className="flex justify-between items-start">
        <EmailInput
          customStyle="w-full mr-8"
          email={email}
          setEmail={setEmail}
          isValid={isValid}
          setIsValid={setIsValid}
        />
        <EmailButton label={'Pošalji'} disabled={!isValid || !email} />
      </div>
    </form>
  )
}

export default EmailCard
