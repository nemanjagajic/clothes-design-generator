import axios from 'axios';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useItems } from '../../store/ItemsContext';

type FormValues = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    city: string;
    address: string;
    email: string;
    zipCode: string
};

export default function OrderForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const { items } = useItems()
    const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
        console.log(data);
        // Submit the form data to your API or server here
        try {
            await axios.post(`${process.env.REACT_APP_BASE_API_URL}/submitOrder`, { ...data, items })
        } catch (error) {
            console.log("Error submiting form", error)
        }
    };

    return (
        <div className="flex justify-center items-center mt-8 flex f-full">
            <div className="w-full">
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
                    <input {...register('firstName', { required: true })} placeholder="Ime" className="border p-2" />
                    {errors.firstName && <span className="text-red-500">Polje je obavezno</span>}

                    <input {...register('lastName', { required: true })} placeholder="Prezime" className="border p-2" />
                    {errors.lastName && <span className="text-red-500">Polje je obavezno</span>}

                    <input
                        {...register('phoneNumber', {
                            required: true,
                            pattern: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g
                        })}
                        placeholder="Broj telefona"
                        className="border p-2"
                        type="tel"
                    />
                    {errors.phoneNumber?.type === 'required' && <span className="text-red-500">Polje je obavezno</span>}
                    {errors.phoneNumber?.type === 'pattern' && <span className="text-red-500">Broj telefona nije pravilno unet</span>}

                    <input {...register('city', { required: true })} placeholder="Grad" className="border p-2" />
                    {errors.city && <span className="text-red-500">Polje je obavezno</span>}

                    <input {...register('address', { required: true })} placeholder="Adresa" className="border p-2" />
                    {errors.address && <span className="text-red-500">Polje je obavezno</span>}
                    <input
                        {...register('zipCode', {
                            required: "Polje je obavezno",
                            pattern: {
                                value: /^[0-9]{5}(-[0-9]{4})?$/, // US ZIP code pattern; adjust as needed
                                message: "Poštanski broj nije pravilno unet"
                            }
                        })}
                        placeholder="ZIP Code"
                        className="border p-2"
                        type="text" // or "tel" if you prefer the numeric keyboard on mobile devices
                    />
                    {errors.zipCode && <span className="text-red-500">{errors.zipCode.message}</span>}

                    <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email" className="border p-2" />
                    {errors.email?.type === 'required' && <span className="text-red-500">Polje je obavezno</span>}
                    {errors.email?.type === 'pattern' && <span className="text-red-500">E-mail adresa nije pravilno uneta</span>}

                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Poruči</button>
                </form>
            </div>

        </div>
    );
}
