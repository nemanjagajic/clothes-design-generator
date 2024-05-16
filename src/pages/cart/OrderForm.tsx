import axios from 'axios'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useItems } from '../../store/ItemsContext'
import { useNavigate } from 'react-router-dom'

type FormValues = {
  firstName: string
  lastName: string
  phoneNumber: string
  city: string
  address: string
  email: string
  zipCode: string
}

export default function OrderForm() {
  const [isOrdering, setIsOrdering] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()
  const { items, emptyCart } = useItems()
  const navigate = useNavigate()
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      setIsOrdering(true)
      const { firstName: name, zipCode, address, ...rest } = data
          // Create FormData object
    const formData = new FormData();

    // Append other data
    for (const key in rest) {
      if (rest.hasOwnProperty(key)) {
        formData.append(key, rest[key]);
      }
    }
    formData.append('name', name);
    formData.append('address', `${address}, ${zipCode}`);

    // Append each order item and their respective properties
    items.forEach((item, index) => {
      formData.append(`orderItems[${index}][color]`, item.color);
      formData.append(`orderItems[${index}][size]`, item.size);
      formData.append(`orderItems[${index}][quantity]`, item.quantity.toString());
      formData.append(`orderItems[${index}][price]`, item.price.toString());
      formData.append(`orderItems[${index}][gender]`, item.gender);
      if (item.uploadedFile) {
        formData.append(`orderItems[${index}][uploadedFile]`, item.uploadedFile);
      } else {
        formData.append(`orderItems[${index}][imageUrl]`, item.imageUrl || 'null');
      }
    });

    // Calculate status
    const status = items.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0).toString();
    formData.append('status', status);

    await axios.post(`${process.env.REACT_APP_BASE_API_URL}/submitOrder`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
      setIsOrdering(false)
      navigate('/success')
      emptyCart()

    } catch (error) {
      setIsOrdering(false)
      console.error('Error submiting form', error)
    }
  }

  return (
    <div className="flex justify-center items-center mt-8 flex f-full">
      <div className="w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-4"
        >
          <div className="flex justify-between">
            <input
              {...register('firstName', { required: true })}
              placeholder="Ime"
              className="border p-2 w-1/2 mr-1"
            />
            {errors.firstName && (
              <span className="text-red-500">Polje je obavezno</span>
            )}

            <input
              {...register('lastName', { required: true })}
              placeholder="Prezime"
              className="border p-2 w-1/2 ml-2"
            />
            {errors.lastName && (
              <span className="text-red-500">Polje je obavezno</span>
            )}
          </div>
          <input
            {...register('phoneNumber', {
              required: true,
              pattern: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g,
            })}
            placeholder="Broj telefona"
            className="border p-2"
            type="tel"
          />
          {errors.phoneNumber?.type === 'required' && (
            <span className="text-red-500">Polje je obavezno</span>
          )}
          {errors.phoneNumber?.type === 'pattern' && (
            <span className="text-red-500">
              Broj telefona nije pravilno unet
            </span>
          )}

          <input
            {...register('city', { required: true })}
            placeholder="Grad"
            className="border p-2"
          />
          {errors.city && (
            <span className="text-red-500">Polje je obavezno</span>
          )}

          <input
            {...register('address', { required: true })}
            placeholder="Adresa"
            className="border p-2"
          />
          {errors.address && (
            <span className="text-red-500">Polje je obavezno</span>
          )}
          <input
            {...register('zipCode', {
              required: 'Polje je obavezno',
              pattern: {
                value: /^[0-9]{5}(-[0-9]{4})?$/, // US ZIP code pattern; adjust as needed
                message: 'Poštanski broj nije pravilno unet',
              },
            })}
            placeholder="ZIP Code"
            className="border p-2"
            type="text" // or "tel" if you prefer the numeric keyboard on mobile devices
          />
          {errors.zipCode && (
            <span className="text-red-500">{errors.zipCode.message}</span>
          )}

          <input
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            placeholder="Email"
            className="border p-2"
          />
          {errors.email?.type === 'required' && (
            <span className="text-red-500">Polje je obavezno</span>
          )}
          {errors.email?.type === 'pattern' && (
            <span className="text-red-500">
              E-mail adresa nije pravilno uneta
            </span>
          )}

          <button
            disabled={isOrdering}
            type="submit"
            className={`text-white py-2 px-4 rounded ${isOrdering ? 'cursor-not-allowed bg-gray-300' : 'cursor-pointer bg-blue-500'}`}
          >
            {isOrdering ? 'Porudžbina se obrađuje...' : 'Poruči'}
          </button>
        </form>
      </div>
    </div>
  )
}
