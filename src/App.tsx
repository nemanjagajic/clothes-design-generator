import React from 'react'
import './styles/globals.css'
import Navbar from './components/navbar/Navbar'
import HomePageBanner from './pages/HomePageBanner'
import ClothesGenerator from './pages/ClothesGenerator'
import ExamplesCarousel from './pages/ExamplesCarousel'
import TShirtSizes from './pages/TShirtSizes'
import FAQSection from './pages/FAQSection'


function App() {
  return (
    <div className="App">
      <Navbar />
      <HomePageBanner />
      <ClothesGenerator />
      <ExamplesCarousel />
      <TShirtSizes />
      <FAQSection />
    </div>
  );
}

export default App;
