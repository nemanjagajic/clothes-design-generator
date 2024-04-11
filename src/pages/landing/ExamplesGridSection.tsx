import React, { useRef } from 'react'
import ImageList from './ImageList'

const prompts = [
  'Beba Rubeus Hagrid',
  'Astronaut surfuje u svemiru',
  'Rep grupa mačića u jaknama, sa sunčanim naočarima',
  'Muški vanzemaljac "Mister univerzuma"',
  '2d morski talasi',
  'DJ Superman na žurci',
  'Renovirane egipatske piramide 3024 godine',
  'Elon musk u tradicionalnoj srpskoj nošnji uskače u kolo',
  'Beba Draco Malfoy',
  'Astronaut kulira uz sok na marsu',
  'Pomeranac u svemiru vija hranu',
  'Sedi žaba sama na listu lokvanja i pije rakiju',
  'Petlovi kao italijanska mafija',
  'Barbie Mona Lisa',
  'Pomeranac vija hranu u svemiru',
  'Apstraktna umetnost u stilu Pabla pikasa, boje crvena, žuta i plava',
  'Vanzemaljac "Miss Univerzuma"',
  'Jutrić kafica sa pogledom',
  'Star Wars tematske poštanske markice',
  'Astronaut na mesecu pije koktel',
  '2D morski talasi',
  'Raphaello from TMNT as a baby',
  'Avengers bebe',
  'Astronaut na mesecu pije koktel',
  'Novak Djokovic se bori sa penzionerima za piletinu u Lidlu',
  'Beba Ron Weasley',
  'Stara slika u retro stilu, crno-beli, analogni selfi turističkog vanzemaljca potpuno obučenog, sa Ajfelovom kulom u pozadini',
  'Kosturi na rege koncertu',
]

const imagePaths = Array.from({ length: 28 }, (_, index) => {
  return {
    src: require(`../../assets/resized_examples/${index + 1}.png`),
    prompt: prompts[index],
  }
})

const ExamplesGridSection = () => {
  const gridRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="flex flex-col py-4 bg-[#FAF9F1] relative pb-20"
      ref={gridRef}
      id="examples"
    >
      <h2 className="w-full px-4 text-black text-[44px] sm:text-5xl sm:text-center font-bold leading-tight pb-10 pt-20">
        <span>Šta su drugi ljudi </span>
        <span
          id="primeri"
          className="text-light-blue text-[50px] sm:text-5xl italic"
        >
          kreirali
        </span>
      </h2>
      <ImageList
        images={imagePaths.concat(imagePaths)}
        scrollDirection="right"
      />
      <ImageList
        images={imagePaths.concat(imagePaths).reverse()}
        scrollDirection="right"
        hideOnMobile
      />
    </div>
  )
}

export default ExamplesGridSection
