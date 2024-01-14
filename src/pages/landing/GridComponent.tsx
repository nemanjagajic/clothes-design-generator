import React, { useRef, useState } from 'react'
import './GridComponent.css' // Adjust the path to your stylesheet if necessary
const images = [
  'https://cdn.midjourney.com/e46a3226-9280-47fb-a591-5a83b74b50cd/0_0.png',
  'https://cdn.midjourney.com/5e0f941c-9f67-4e6b-a2e4-299c0d1c2524/0_0.png',
  'https://cdn.discordapp.com/attachments/989274756341706822/1192155845753057441/dovlaper_Novak_Djokovic_holding_a_chicken_fighting_old_people_i_f564a2de-7dca-4773-9d00-49d71cc51b8c.png?ex=65b14726&is=659ed226&hm=c527f6fc39296a7a8ffe5b59b55626a589d9726f134c65ae6fc94d70f82b6b10&',
  'https://cdn.discordapp.com/attachments/984632424610824222/1183830085183221863/janezribnikar_Novak_Djokovic_with_the_Wimbledon_trophy_12ceefe2-65ec-4aee-ad62-606dee92d15f.png?ex=65aeacae&is=659c37ae&hm=caf39f45a5430d498d6c5f07c1debd8cdfb76c8d32377ec480417a8e66d1c153&',
  'https://cdn.midjourney.com/07ba99c6-55eb-4fd0-b1db-066cb81040c3/0_0.png',
  'https://cdn.midjourney.com/07ba99c6-55eb-4fd0-b1db-066cb81040c3/0_1.png',
  'https://cdn.midjourney.com/d832dd11-d434-4d19-be1d-9715a1ac05d6/0_0.png',
  'https://cdn.discordapp.com/attachments/989274756341706822/1192151238125555914/dovlaper_space_invasion_in_star_wars_style_on_retro_postal_stam_7930e2b6-4c42-461f-91f9-18c164728fd0.png?ex=65b142dc&is=659ecddc&hm=167eef42e92c86d676fa92d9fd4af0ee4ace87bfbc4daa077c0f8bfa274415f5&',
  'https://cdn.discordapp.com/attachments/1061664028969152632/1192015465862668419/dovlaper_pomeranian_spits_food_in_space_63586bb2-9595-4615-a7e8-c7b2f051a8b2.png?ex=65a789e9&is=659514e9&hm=f67f8355261b85ac4a306b7406e0d25bd81c2266be3f04613337dfb3d3cc2264&',
  'https://cdn.midjourney.com/e46a3226-9280-47fb-a591-5a83b74b50cd/0_1.png',
  'https://cdn.midjourney.com/5e0f941c-9f67-4e6b-a2e4-299c0d1c2524/0_1.png',
  'https://cdn.discordapp.com/attachments/1061664028969152632/1192145003691114546/dovlaper_A_frog_sits_alone_on_a_water_lily_leaf_with_glasses_an_74a758eb-63a7-4b41-a681-dacaeb8a8abf.png?ex=65a8028d&is=65958d8d&hm=4457f3603c2c6a9714300208f93925db489b029c2e54bcaf8a31604f4ffd425e&',
  'https://cdn.discordapp.com/attachments/1061664028969152632/1192144917888245941/dovlaper_Soljics_coffee_with_a_background_of_hilly_areas_c92772cc-e0eb-408d-9063-a919c596a6ca.png?ex=65a80279&is=65958d79&hm=e5b4d7813c154256267efb33044e12fa6cd95dda434375eb1e2b56a74bbb7208&',
  'https://cdn.discordapp.com/attachments/1061664028969152632/1192142484562784256/dovlaper_cold_coffee_with_coconut_milk_156bc044-6472-4640-b578-19c594855b70.png?ex=65a80035&is=65958b35&hm=f6fae8c7cec9315b564fa3d5c52cc5ea6acfd1bc3a1fe4a19784518bbca0786d&',
  'https://cdn.midjourney.com/d832dd11-d434-4d19-be1d-9715a1ac05d6/0_1.png',
  'https://cdn.midjourney.com/f145424b-c55c-4182-9ef8-3b1fb6139a77/0_0.png',
  'https://cdn.midjourney.com/5ae4293b-d6f6-4676-bc57-05870fd38c9a/0_0.png',
  'https://cdn.midjourney.com/fc744bc0-ba2d-49e4-b4d8-c21d8ea809a3/0_0.png',
  'https://cdn.midjourney.com/70ef4ef6-faaa-477d-ba1a-69157802b157/0_0.png',
  'https://cdn.midjourney.com/dd987ac9-956c-49a9-a99a-004cda8c0591/0_0.png',
  'https://cdn.midjourney.com/e46a3226-9280-47fb-a591-5a83b74b50cd/0_2.png',
  'https://cdn.midjourney.com/5e0f941c-9f67-4e6b-a2e4-299c0d1c2524/0_3.png',
  'https://cdn.midjourney.com/e46a3226-9280-47fb-a591-5a83b74b50cd/0_3.png',
]
const GridComponent = ({ children }: { children: React.ReactNode }) => {
  const gridRef = useRef<HTMLDivElement>(null)
  const [lampPosition, setLampPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (gridRef.current) {
      const gridRect = gridRef.current.getBoundingClientRect()
      setLampPosition({
        x: event.clientX - gridRect.left,
        y: event.clientY - gridRect.top, // Adjust as per your correction
      })
    }
  }

  const lampStyle = {
    background: `
          radial-gradient(
            circle at ${lampPosition.x}px ${lampPosition.y}px, 
            rgba(255, 255, 255, 0) 80px, 
            rgba(0, 0, 0, 0.4) 120px, 
            rgba(0, 0, 0, 0.9) 160px
          )
        `,
    zIndex: 10, // Higher z-index for the lamp overlay
  }

  return (
    <div
      className="relative bg-black w-full"
      ref={gridRef}
      onMouseMove={handleMouseMove}
    >
      <div className="grid grid-cols-8 gap-1">
        {Array.from({ length: 24 }).map((_, index) => {
          return (
            <div key={index} className="square-cell">
              <div className="square-content bg-blue-200">
                <img
                  src={images[index]}
                  alt=""
                  className="transition duration-500 ease-in-out transform hover:scale-105 hover:z-50 border-0 rounded-md"
                />
              </div>
            </div>
          )
        })}
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={lampStyle}
      ></div>
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center px-16 z-[51]  flex-col w-full xl:w-[40%]">
        {children}
      </div>
    </div>
  )
}

export default GridComponent
