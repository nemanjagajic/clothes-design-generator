import { Item, useItems } from "../../store/ItemsContext"
import Card from "./Card"



type OrderItemsProps = {
    items: Item[]
}

const OrderItems = ({ items }: OrderItemsProps) => {
    const { addToCart, removeFromCart, removeAllFromCart } = useItems()

    return (<div className="overflow-y-auto h-[500px] p-2 mt-4">
        {items.map((item) => {
            return <div className="flex items-center justify-center">
                <Card {...item} onAdd={() => { addToCart(item) }} onRemove={() => { removeFromCart(item) }} onRemoveAll={() => { removeAllFromCart(item) }} price={2400} />
            </div>
        })}
    </div>)

}


export default OrderItems