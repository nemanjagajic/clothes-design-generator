import React, { useState } from 'react'
import './styles/globals.css'
import Navbar from './components/navbar/Navbar'
import HomePageBanner from './pages/HomePageBanner'
import ClothesGenerator from './pages/ClothesGenerator'
import ExamplesCarousel from './pages/ExamplesCarousel'
import TShirtSizes from './pages/TShirtSizes'
import FAQSection from './pages/FAQSection'
import OurCustomers from './pages/OurCustomers'
import Footer from './pages/Footer'
import CartDrawer from './components/cart/CartDrawer'
import { v4 as uuidv4 } from 'uuid'

const userId = uuidv4()

function App() {
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
  );
}

export default App
