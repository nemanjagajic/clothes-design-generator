import React, { useEffect, useRef } from 'react'
import { useItems } from '../../store/ItemsContext'
import Card from '../shared/Card'
import Button from '../shared/Button'
import { useNavigate } from 'react-router-dom'
// @ts-ignore
import blackTShirt from '../../assets/images/black-tshirt.png'
// @ts-ignore
import oliveTShirt from '../../assets/images/olive-tshirt.png'
// @ts-ignore
import redTShirt from '../../assets/images/red-tshirt.png'
// @ts-ignore
import whiteTShirt from '../../assets/images/white-tshirt.png'
// @ts-ignore
import grayTShirt from '../../assets/images/gray-tshirt.png'
import { useSwipeable } from 'react-swipeable';


const TSHIRTS: { [color: string]: string } = {
  black: blackTShirt,
  green: oliveTShirt,
  red: redTShirt,
  white: whiteTShirt,
  gray: grayTShirt
}

type CartDrawerTypes = {
  isCartOpen: boolean
  onSurroundingAreaClicked: () => void
}
const CartDrawer = ({
  isCartOpen,
  onSurroundingAreaClicked,
}: CartDrawerTypes) => {
  const handlers = useSwipeable({
    onSwipedRight: (eventData) => {
      onSurroundingAreaClicked()
    },

    delta: 30, // Minimum distance(px) before a swipe starts. Default is 10.
  });
  const drawerRef = useRef<HTMLDivElement>(null)
  const { items, addToCart, removeFromCart, removeAllFromCart } = useItems()
  const navigate = useNavigate()
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target) && !event.target.closest('#cart-button')) {
        onSurroundingAreaClicked()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [drawerRef])

  return (
    <div {...handlers}>
      <div
        ref={drawerRef}
        className={`fixed z-30 bg-white right-0 top-0 h-full w-[350px] shadow-xl transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-300`}
      >
        <h3 className="font-bold text-xl m-8">Korpa</h3>
        <div className="flex flex-col h-full">
          <div className="overflow-y-auto h-[calc(100%-190px)] p-2">
            {!items.length && <div className='w-full flex justify-center items-center mt-20'><p className="text-gray-600">Korpa je prazna</p></div>}
            {items.map((item, index) => {
              return (
                <div key={index}>
                  <Card
                    imageUrl={item.imageUrl!}
                    price={2300}
                    gender={item.gender}
                    onRemove={() => {
                      removeFromCart(item)
                    }}
                    quantity={item.quantity}
                    onAdd={() => {
                      addToCart(item)
                    }}
                    onRemoveAll={() => {
                      removeAllFromCart(item)
                    }}
                    size={item.size}
                    color={item.color}
                    shirtSrc={TSHIRTS[item.color]}
                  />
                </div>
              )
            })}
          </div>
          <div className={`absolute bottom-0 w-full h-24 flex items-center justify-center`}>
            <Button
              isMain
              text="Poruči"
              customStyles={`w-full mx-2 h-[50px] md:w-[300px] md:ml-4 ${(!items.length) && 'bg-gray-300'}`}
              isDisabled={!items.length}
              disabledText={"Poruči"}
              onClick={() => {
                navigate('/cart')
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartDrawer
