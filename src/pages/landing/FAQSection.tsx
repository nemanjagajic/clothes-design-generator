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
      question: 'Koliko vremena je potrebno da stigne moja narudžbina?',
      answer:
        'Vreme isporuke zavisi od vaše lokacije i načina dostave koji odaberete. Uobičajeno, većina narudžbina stiže u roku od 2-4 radnih dana. Pratite informacije o isporuci koje ćete dobiti prilikom naručivanja.',
    },
    {
      question: 'Da li mogu da vratim ili zamenim majicu ako nisam zadovoljan?',
      answer:
        'Nažalost, ne prihvatamo povrate ni zamene za majice koje su već naručene i isporučene, osim u slučaju da je proizvod fizički oštećen ili ima grešku u štampanju. Molimo vas da pažljivo razmislite o svojoj narudžbini pre nego što je potvrdite, jer nakon što je procesuirana, nije moguće izvršiti povrat ili zamenu iz razloga kao što su promena mišljenja ili nezadovoljstvo dizajnom. Sve informacije o uslovima povrata i zamene možete pronaći u našim uslovima korišćenja.',
    },
    {
      question:
        'Da li postoji ograničenje u vezi sa dužinom teksta koji mogu da unesem?',
      answer:
        'Ne, nemamo strogo ograničenje u vezi sa dužinom teksta koji možete uneti. Možete koristiti tekst koji vam najbolje odgovara kako biste opisali svoju zamisao ili poruku za generisanje slike na majici. Međutim, savetujemo da budete razumni u dužini teksta kako biste osigurali da se tekst lepo i pregledno prikaže na majici i da se jasno prenese vaša zamisao ili poruka. Ukoliko imate bilo kakvih pitanja ili nedoumica u vezi sa dužinom teksta, slobodno nas kontaktirajte, i rado ćemo vam pomoći.',
    },
  ]

  return (
    <Container customStyles={'my-16'}>
      <div className='flex flex-col w-full'>
        <h3
          id='questions'
          className='mb-10 text-main-black text-4xl font-extrabold'
        >
          Vaša pitanja
        </h3>
        <div className='flex flex-col'>
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
