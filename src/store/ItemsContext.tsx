import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { v4 as uuidv4 } from 'uuid'
import { convertFileToSrc } from '../pages/landing/ImageGenerator/utils'

export type SizeOption = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'
export type Gender = 'male' | 'female'

export const genderToLabel = {
  male: 'Muški',
  female: 'Ženski',
}

export type Item = {
  imageUrl: string | null
  color: string
  size: SizeOption
  quantity: number
  price: number
  gender: Gender
  uploadedFile: File | null
  uploadedFileSrc: string | null
}
const defaultItem = {
  size: 'L' as SizeOption,
  quantity: 1,
  color: 'black',
  imageUrl: null,
  price: 2300,
  gender: 'male' as Gender,
  type: 'tshirt',
  uploadedFile: null,
  uploadedFileSrc: null
}
// Create the context
const ItemsContext = createContext<{
  items: Item[]
  addToCart: (item: Item) => void
  removeFromCart: (itemToRemove: Item) => void
  removeAllFromCart: (itemToRemove: Item) => void
  currentItem: Item
  totalPrice: number
  itemCount: number
  updateCurrentItem: (itemData: Partial<Item>) => void
  emptyCart: () => void
  userId: string
  updateFile: (file: File | null)=> void
}>({
  items: [defaultItem],
  addToCart: () => {},
  removeFromCart: () => {},
  removeAllFromCart: () => {},
  currentItem: defaultItem,
  updateCurrentItem: () => {},
  emptyCart: () => {},
  totalPrice: 0,
  itemCount: 0,
  userId: '',
  updateFile: () => {}
})

// Implement the Provider
export const ItemsProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Item[]>([])
  const [currentItem, setCurrentItem] = useState<Item>(defaultItem)

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    if (!userId) {
      localStorage.setItem('userId', uuidv4())
    }
  }, [])

  const userId = useMemo(() => {
    return localStorage.getItem('userId') as string
  }, [])

  useEffect(() => {
    const itemsFromStorage = localStorage.getItem('cart')
    if (itemsFromStorage) {
      setItems(JSON.parse(itemsFromStorage))
    }
  }, [])

  const updateCurrentItem = (itemData: Partial<Item>) => {
    if (!currentItem) {
      setCurrentItem(itemData as Item)
      return
    }

    setCurrentItem((prevcurrentItem) => ({
      ...prevcurrentItem!,
      ...itemData,
    }))
  }

  const updateFile = (file: File | null) => { 
    convertFileToSrc(file, (src) => {
      setCurrentItem((prevcurrentItem) => ({
        ...prevcurrentItem!,
        uploadedFile: file,
        uploadedFileSrc: src as string
      }))
     })
   }

  const addToCart = (newItem: Item) => {
    if (!newItem?.imageUrl && !newItem?.uploadedFileSrc) return
    const existingIndex = items.findIndex(
      (item) =>
        item.imageUrl === newItem.imageUrl &&
        item.color === newItem.color &&
        item.size === newItem.size &&
        item.gender === newItem.gender && 
        item.uploadedFileSrc === newItem.uploadedFileSrc
    )

    if (existingIndex !== -1) {
      const updatedItems = [...items]
      updatedItems[existingIndex].quantity += 1
      setItems(updatedItems)
      localStorage.setItem('cart', JSON.stringify(updatedItems.map(item => {
        const {uploadedFile, uploadedFileSrc, ...rest} = item
        return rest
      })))

    } else {
      setItems([...items, { ...newItem, quantity: 1 }])
      const itemsWithoutFile = items.map(item => {
        const { uploadedFile, uploadedFileSrc, ...rest} = item
        return rest
      })

      const { uploadedFile, uploadedFileSrc, ...rest } = newItem
      console.log("ITEMS WITHOUT", itemsWithoutFile)
      localStorage.setItem(
        'cart',
        JSON.stringify([...itemsWithoutFile, { ...rest, quantity: 1 }]),
      )
    }
  }

  const emptyCart = () => {
    setItems([])
    localStorage.setItem('cart', '[]')
  }

  const removeAllFromCart = (itemToRemove: Item) => {
    const updatedItems = items.filter(
      (item) =>
        !(
          item.imageUrl === itemToRemove.imageUrl &&
          item.color === itemToRemove.color &&
          item.size === itemToRemove.size &&
          item.gender === itemToRemove.gender &&
          item.uploadedFileSrc === itemToRemove.uploadedFileSrc

        ),
    )
    setItems(updatedItems)
    localStorage.setItem('cart', JSON.stringify(updatedItems.map(item => {
        const {uploadedFile, uploadedFileSrc, ...rest} = item
        return rest
      })))
  }

  const totalPrice = useMemo(() => {
    return items.reduce((acc, item) => {
      return acc + item.price * item.quantity
    }, 0)
  }, [items])

  const itemCount = useMemo(() => {
    return items.reduce((acc, item) => {
      console.log("ITEMS", items)
      return acc + item.quantity
    }, 0)
  }, [items])

  const removeFromCart = (itemToRemove: Item) => {
    const updatedItems = items.reduce((updatedItems, item) => {
      if (
        item.imageUrl === itemToRemove.imageUrl &&
        item.color === itemToRemove.color &&
        item.size === itemToRemove.size &&
        item.gender === itemToRemove.gender
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
    setItems(updatedItems)

    localStorage.setItem('cart', JSON.stringify(updatedItems.map(item => {
        const {uploadedFile, uploadedFileSrc, ...rest} = item
        return rest
    })))
  }

  return (
    <ItemsContext.Provider
      value={{
        userId,
        items,
        addToCart,
        removeFromCart,
        removeAllFromCart,
        currentItem,
        updateCurrentItem,
        totalPrice,
        itemCount,
        emptyCart,
        updateFile
      }}
    >
      {children}
    </ItemsContext.Provider>
  )
}

export const useItems = () => useContext(ItemsContext)
