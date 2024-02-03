import React, { useState } from 'react'
import CartDrawer from '../../components/cart/CartDrawer'
import Navbar from '../../components/navbar/Navbar'
import HomePageBanner from './HomePageBanner'
import ClothesGenerator from './ClothesGenerator'
import ExamplesCarousel from './ExamplesCarousel'
import TShirtSizes from './TShirtSizes'
import FAQSection from './FAQSection'
import OurCustomers from './OurCustomers'
import Footer from './Footer'
import { useItems } from '../../store/ItemsContext'
import Instructions from './Instructions'
import ExampleSection from './ExampleSection'
import { v4 as uuidv4 } from 'uuid'
import ExamplesGridSection from './ExamplesGridSection'

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
      <Navbar onCartClicked={() => setIsCartOpen(true)} itemCount={itemCount} />
      <HomePageBanner />
      <ExampleSection />
      <ExamplesGridSection />
      <Instructions />
      <ClothesGenerator imgGenerationRef={imgGenerationRef} />
      <ExamplesCarousel />
      <TShirtSizes />
      <FAQSection />
      <OurCustomers />
      <Footer />
    </div>
  )
}

export default MyComponent
