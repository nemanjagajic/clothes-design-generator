import { Item, useItems } from "../../store/ItemsContext"
import Card from "./Card"



type OrderItemsProps = {
    items: Item[]
}

const OrderItems = ({ items }: OrderItemsProps) => {
    const { addToCart, removeFromCart, removeAllFromCart } = useItems()

    return (<div>
        {items.map((item) => {
            return <div className="flex items-center justify-center">
                <Card {...item} onAdd={() => { addToCart(item) }} onRemove={() => { removeFromCart(item) }} onRemoveAll={() => { removeAllFromCart(item) }} price={"2400"} />
            </div>
        })}
    </div>)

}


export default OrderItems