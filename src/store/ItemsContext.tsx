import React, { createContext, ReactNode, useContext, useState } from 'react'

export type SizeOption = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'

export type Item = {
  imageUrl: string | null
  color: string
  size: SizeOption
  quantity: number
}
const defaultItem = {
  size: 'M' as SizeOption,
  quantity: 1,
  color: 'white',
  imageUrl: null,
}
// Create the context
const ItemsContext = createContext<{
  items: Item[]
  addToCart: (item: Item) => void
  removeFromCart: (itemToRemove: Item) => void
  currentItem: Item
  updateCurrentItem: (itemData: Partial<Item>) => void
}>({
  items: [defaultItem],
  addToCart: () => {},
  removeFromCart: () => {},
  currentItem: defaultItem,
  updateCurrentItem: () => {},
})

// Implement the Provider
export const ItemsProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Item[]>([])
  const [currentItem, setcurrentItem] = useState<Item>(defaultItem)

  const updateCurrentItem = (itemData: Partial<Item>) => {
    if (!currentItem) {
      setcurrentItem(itemData as Item)
      return
    }

    setcurrentItem((prevcurrentItem) => ({
      ...prevcurrentItem!,
      ...itemData,
    }))
  }

  const addToCart = (newItem: Item) => {
    if (!newItem?.imageUrl) return
    const existingIndex = items.findIndex(
      (item) =>
        item.imageUrl === newItem.imageUrl &&
        item.color === newItem.color &&
        item.size === newItem.size
    )

    if (existingIndex !== -1) {
      const updatedItems = [...items]
      updatedItems[existingIndex].quantity += 1
      setItems(updatedItems)
    } else {
      setItems([...items, { ...newItem, quantity: 1 }])
    }
  }

  const removeFromCart = (itemToRemove: Item) => {
    setItems((prevItems) => {
      return prevItems.reduce((updatedItems, item) => {
        if (
          item.imageUrl === itemToRemove.imageUrl &&
          item.color === itemToRemove.color &&
          item.size === itemToRemove.size
        ) {
          if (item.quantity > 1) {
            // Reduce quantity
            updatedItems.push({
              ...item,
              quantity: item.quantity - 1,
            })
          }
          // If quantity matches or is less, item gets removed (not pushed)
        } else {
          updatedItems.push(item)
        }
        return updatedItems
      }, [] as Item[])
    })
  }

  return (
    <ItemsContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        currentItem,
        updateCurrentItem,
      }}
    >
      {children}
    </ItemsContext.Provider>
  )
}

export const useItems = () => useContext(ItemsContext)
