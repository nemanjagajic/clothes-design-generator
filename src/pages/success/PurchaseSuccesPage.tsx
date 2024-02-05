import React from 'react';
import Footer from '../landing/Footer';
import Navbar from '../../components/navbar/Navbar';
import Button from '../../components/shared/Button';
import { useNavigate } from 'react-router-dom';

const PurchaseSuccessPage = () => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col h-screen w-full">
            <Navbar onCartClicked={null} itemCount={1} />
            <div className='flex flex-col justify-center items-center flex-grow'>
                <h1 className='text-4xl font-bold mb-6'>Uspešno ste poručili!</h1>
                <p className='font-normal mb-8'>Očekujte poziv od našeg operatera kako bi smo potvrdili porudžbinu</p>
                <p className='text-8xl'>🎉</p>
            </div>
            <Button
                isMain
                text={'Idi na početni ekran'}
                onClick={() => { navigate('/') }}
                customStyles={'w-[300px]'}
            />
            <Footer />
        </div>
    )
}

export default PurchaseSuccessPage;
