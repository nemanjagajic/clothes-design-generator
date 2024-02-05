import './styles/globals.css'
import React from 'react'
import LandingPage from './pages/landing/LandingPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DashboardHome from './pages/dashboard/DashboardHome'
import CartPage from './pages/cart/CartPage'
import PurchaseSuccessPage from './pages/success/PurchaseSuccesPage'

function App() {
  const router = createBrowserRouter([
    {
      path: '/dashboard',
      element: <DashboardHome />,
    },
    {
      path: '/',
      element: <LandingPage />,
    },
    {
      path: '/cart',
      element: <CartPage />,
    },
    { path: '/success', element: <PurchaseSuccessPage /> }
  ])

  return <RouterProvider router={router} />
}

export default App
