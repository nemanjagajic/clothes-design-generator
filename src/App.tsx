import React from 'react'
import './styles/globals.css'
import Navbar from './components/navbar/Navbar'
import HomePageBanner from './pages/HomePageBanner'
import ClothesGenerator from './pages/ClothesGenerator'


function App() {
  return (
    <div className="App">
      <Navbar />
      <HomePageBanner />
      <ClothesGenerator />
    </div>
  );
}

export default App;
