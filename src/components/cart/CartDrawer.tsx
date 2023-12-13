import React, { useEffect, useRef } from 'react'
import { useItems } from '../../store/ItemsContext'
import Card from '../shared/Card'

type CartDrawerTypes = {
  isCartOpen: boolean
  onSurroundingAreaClicked: () => void
}
const CartDrawer = ({
  isCartOpen,
  onSurroundingAreaClicked,
}: CartDrawerTypes) => {
  const drawerRef = useRef<HTMLDivElement>(null)
  const { items, addToCart, removeFromCart } = useItems()

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        onSurroundingAreaClicked()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [drawerRef])

  return (
    <div
      ref={drawerRef}
      className={`fixed z-10 bg-white right-0 top-0 h-full w-[350px] shadow-xl transform ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300`}
    >
      <h3 className='font-bold text-xl m-8'>Korpa</h3>
      <div>
        {items.map((item) => {
          return (
            <div>
              <Card
                imageUrl={item.imageUrl!}
                price={'2400'}
                onRemove={() => {
                  removeFromCart(item)
                }}
                quantity={item.quantity}
                onAdd={() => {
                  addToCart(item)
                }}
                size={item.size}
                color={item.color}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CartDrawer
