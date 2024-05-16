import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import { useEffect, useState } from 'react'
import OrderForm from './OrderForm'
import OrderItems from './OrderItems'
import { useItems } from '../../store/ItemsContext'
import CartDrawer from '../../components/cart/CartDrawer'
import Footer from '../landing/Footer'

const CartPage = () => {
  const { items, itemCount, totalPrice } = useItems()
  const [isCartOpen, setIsCartOpen] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (!itemCount) {
      navigate('/')
    }
  }, [items])

  return (
    <>
      <Navbar onCartClicked={() => setIsCartOpen(true)} itemCount={itemCount} />
      <CartDrawer
        isCartOpen={isCartOpen}
        onSurroundingAreaClicked={() => setIsCartOpen(false)}
      />
      <div className="mt-28 mx-10 lg:mx-24 ">
        <h1 className="text-5xl font-bold leading-tight">Završi kupovinu</h1>
        <div className="mt-12 ">
          <span className="text-neutral-500 text-base font-normal font-['Segoe UI']">
            Porudžbinu plaćaš pouzećem, potrebno je 3-5 dana da porudžbina
            stigne na tvoju adresu. Cena poštarine je{' '}
          </span>
          <span className="text-black text-base font-semibold font-['Segoe UI']">
            450Rsd
          </span>
          <span className="text-neutral-500 text-base font-normal font-['Segoe UI']">
            {' '}
            na teritoriji Srbije.
          </span>
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2">
            <OrderForm />
          </div>
          <div className="w-full lg:w-1/2 flex-row justify-center items-center">
            <OrderItems items={items} />
            <div className="font-sans text-gray-500 sm:mx-20 mb-8 mt-4">
              <div className="flex justify-between pb-2">
                <span>Porudžbina</span>
                <span>{totalPrice} RSD</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Dostava</span>
                <span>do 450rsd</span>
              </div>
              <div className="flex justify-between border-t-2 pt-2">
                <span className="font-bold">Ukupno:</span>
                <span className="font-bold">{totalPrice + 450}rsd</span>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <Footer />
    </>
  )
}

export default CartPage
