import React from 'react';
import Footer from '../landing/Footer';
import Navbar from '../../components/navbar/Navbar';
import Button from '../../components/shared/Button';
import { useNavigate } from 'react-router-dom';

const PurchaseSuccessPage = () => {
    const navigate = useNavigate()

    return (
      <>
        <div className="flex flex-col w-full h-screen items-center">
          <Navbar onCartClicked={null} itemCount={1} />
          <div className="flex flex-col justify-center items-center my-40 mx-4">
            <h1 className="text-4xl font-bold mb-6 text-center">
              Uspešno ste poručili!
            </h1>
            <p className="mb-8 text-gray-600 text-center">
              Očekujte poziv od našeg operatera kako bi smo potvrdili porudžbinu
            </p>
            <p className="text-8xl">🎉</p>
          </div>
          <div className="w-full px-4 flex flex-col items-center justify-center">
            <p className="text-gray-600 mb-8 text-center text-2xl">
              Dobijaš nazad svojih 5 generisanja! 🎨
            </p>
            <Button
              isMain
              text={'Idi na početni ekran'}
              onClick={() => {
                navigate('/#t-shirt-container')
              }}
              customStyles="w-full sm:w-[500px]"
            />
          </div>
        </div>
        <Footer />
      </>
    )
}

export default PurchaseSuccessPage;
