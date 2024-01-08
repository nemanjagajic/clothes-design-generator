import { useLocation, useNavigate } from "react-router-dom"
import Navbar from "../../components/navbar/Navbar"
import { useEffect, useState } from "react"
import OrderForm from "./OrderForm"
import OrderItems from "./OrderItems"
import { useItems } from "../../store/ItemsContext"



const CartPage = () => {
    const { items } = useItems()
    const [isCartOpen, setIsCartOpen] = useState(false)
    const navigate = useNavigate()
    console.log("Items brate", items)
    useEffect(() => {
        if (!items) {
            navigate('/')
        }
    }, [items])

    return <>
        <Navbar onCartClicked={() => setIsCartOpen(true)} />
        <div className="mt-28 mx-10 lg:mx-24">
            <h1 className='text-5xl font-bold leading-tight'>Završi kupovinu</h1>
            <div className="mt-12 "><span className="text-neutral-500 text-base font-normal font-['Segoe UI']">Porudžbinu plaćaš pouzećem, potrebno je 3-5 dana da porudžbina stigne na tvoju adresu. Cena poštarine je </span><span className="text-black text-base font-semibold font-['Segoe UI']">250 Rsd</span><span className="text-neutral-500 text-base font-normal font-['Segoe UI']"> na teritoriji Srbije.</span></div>
            <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/2">
                    <OrderForm />
                </div>
                <div className="w-full lg:w-1/2">
                    <OrderItems items={items} />
                </div>
            </div>
            <div></div>
        </div>
    </>
}


export default CartPage 