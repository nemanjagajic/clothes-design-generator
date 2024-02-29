import React, { useEffect, useState } from 'react'
import CartDrawer from '../../components/cart/CartDrawer'
import Navbar from '../../components/navbar/Navbar'
import HomePageBanner from './HomePageBanner'
import ClothesGenerator from './ClothesGenerator'
import FAQSection from './FAQSection'
import OurCustomers from './OurCustomers'
import Footer from './Footer'
import { useItems } from '../../store/ItemsContext'
import Instructions from './Instructions'
import ExampleSection from './ExampleSection'
import { v4 as uuidv4 } from 'uuid'
import ExamplesGridSection from './ExamplesGridSection'
import SizeSection from './SizeSection'

const imgGenerationRef = uuidv4()


const MyComponent = () => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { itemCount } = useItems()

  return (
    <div className="App">
      <CartDrawer
        isCartOpen={isCartOpen}
        onSurroundingAreaClicked={() => setIsCartOpen(false)}
      />
      <Navbar onCartClicked={() => setIsCartOpen(isOpen => !isOpen)} itemCount={itemCount} />
      <HomePageBanner />
      <ExampleSection />
      <ExamplesGridSection />
      <Instructions />
      <ClothesGenerator imgGenerationRef={imgGenerationRef} />
      <OurCustomers />
      <SizeSection />
      <FAQSection />
      <Footer />
    </div>
  )
}

export default MyComponent
