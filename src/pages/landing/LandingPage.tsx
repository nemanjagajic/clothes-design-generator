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
import RemoveOrderModal from '../cart/RemoveOrderModal'
import HistoryDrawer from '../../components/history/HistoryDrawer'

const imgGenerationRef = uuidv4()

const LandingPage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const { itemCount } = useItems()
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="App">
      {/* <RemoveOrderModal
        onCancel={() => { setModalOpen(false) }}
        onRemove={() => { setModalOpen(false) }}
        isOpen={modalOpen}
      /> */}
      <CartDrawer
        isCartOpen={isCartOpen}
        onSurroundingAreaClicked={() => setIsCartOpen(false)}
      />
      <HistoryDrawer
        isHistoryOpen={isHistoryOpen}
        onSurroundingAreaClicked={() => setIsHistoryOpen(false)}
      />
      <Navbar
        onHistoryClicked={() => setIsHistoryOpen(isOpen => !isOpen)}
        onCartClicked={() => setIsCartOpen(isOpen => !isOpen)}
        itemCount={itemCount} />
      <HomePageBanner />
      <ExampleSection />
      <ExamplesGridSection />
      <Instructions />
      <ClothesGenerator onHistoryClicked={() => setIsHistoryOpen(isOpen => !isOpen)}
        imgGenerationRef={imgGenerationRef} />
      <SizeSection />
      <OurCustomers />
      <FAQSection />
      <Footer />
    </div>
  )
}

export default LandingPage
