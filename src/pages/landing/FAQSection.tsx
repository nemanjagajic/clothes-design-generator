import React from 'react'
import Container from '../../components/shared/Container'
import FAQAnswer from '../../components/faq/FAQAnswer'

const FaqSection = () => {
  const questionsAndAnswers = [
    {
      question: 'Kako mogu da naručim majicu sa generisanom slikom?',
      answer:
        'Naručivanje majice sa generisanom slikom je jednostavno. Prvo, unesite željeni tekst ili frazu u odgovarajuće polje na našoj početnoj stranici. Zatim prilagodite opcije kao što su veličina i boja majice. Kliknite na dugme "Naruči" i pratite upute za unos podataka za dostavu i plaćanje.',
    },
    {
      question: 'Koliko vremena je potrebno da stigne moja narudžbina i koje su opcije plaćanja?',
      answer:
        'Vreme isporuke zavisi od vaše lokacije i izabranog načina dostave, pri čemu većina narudžbina stiže u roku od 2-4 radna dana. Što se tiče plaćanja, trenutno je moguće platiti pouzećem.',
    },
    {
      question: 'Da li mogu da vratim ili zamenim majicu ako nisam zadovoljan?',
      answer:
        'Ukoliko primetite bilo kakvo fizičko oštećenje na majici po prijemu, obezbedićemo zamenu. Međutim, zbog jedinstvene prirode svake porudžbine, ne možemo prihvatiti povratak ili zamenu iz drugih razloga. Hvala na razumevanju.',
    },
    {
      question:
        'Da li postoji ograničenje u vezi sa dužinom teksta koji mogu da unesem?',
      answer:
        'Možete uneti tekst željene dužine za dizajn vaše majice; ne postoji ograničenje. Ipak, naš sistem automatski sprečava upotrebu psovki ili uvredljivih reči, pa takvi izrazi neće biti prihvaćeni.',
    },
    {
      question: "Kako se održavaju majice sa štampom i da li postoji poseban način pranja da bi štampa trajala duže?",
      answer: "Za očuvanje kvaliteta štampe na vašim majicama, preporučujemo pranje na 30 stepeni sa unutrašnje strane i sušenje na niskoj temperaturi ili prirodno sušenje bez direktnog izlaganja suncu. Izbegavajte upotrebu izbeljivača i direktno peglanje preko štampe da bi se dizajn održao jasnim i postojanim što duže vreme."
    }
  ]

  return (
    <Container customStyles={'py-16 bg-nsm-gray-100'}>
      <div className="flex items-center flex-col w-full" id="questions">
        <h2 className="text-black text-[44px] sm:text-5xl sm:text-center font-bold leading-tight pb-16">
          Najčešća pitanja
        </h2>
        <div className="flex flex-col xl:w-[1024px]">
          {questionsAndAnswers.map((questionAndAnswer, index) => (
            <div key={index}>
              <FAQAnswer
                question={questionAndAnswer.question}
                answer={questionAndAnswer.answer}
                isInitiallyOpen={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}

export default FaqSection
