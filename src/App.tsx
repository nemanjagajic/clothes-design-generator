import './styles/globals.css'
import React from 'react'
import LandingPage from './pages/landing/LandingPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DashboardHome from './pages/dashboard/DashboardHome'
import CartPage from './pages/cart/CartPage'

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
      element: <CartPage />
    }
  ])

  return <RouterProvider router={router} />
}

export default App
