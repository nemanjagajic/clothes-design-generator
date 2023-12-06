import React, {useState} from 'react'
import CartDrawer from "../../components/cart/CartDrawer"
import Navbar from "../../components/navbar/Navbar"
import HomePageBanner from "./HomePageBanner"
import ClothesGenerator from "./ClothesGenerator"
import ExamplesCarousel from "./ExamplesCarousel"
import TShirtSizes from "./TShirtSizes"
import FAQSection from "./FAQSection"
import OurCustomers from "./OurCustomers"
import Footer from "./Footer"
import { v4 as uuidv4 } from 'uuid'

const userId = uuidv4()

const MyComponent = () => {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <div className="App">
      <CartDrawer isCartOpen={isCartOpen} onSurroundingAreaClicked={() => setIsCartOpen(false)} />
      <Navbar onCartClicked={() => setIsCartOpen(true)} />
      <HomePageBanner />
      <ClothesGenerator userId={userId} />
      <ExamplesCarousel />
      <TShirtSizes />
      <FAQSection />
      <OurCustomers />
      <Footer />
    </div>
  )
}

export default MyComponent
