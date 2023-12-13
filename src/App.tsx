import './styles/globals.css'
import React from 'react'
import LandingPage from './pages/landing/LandingPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DashboardHome from './pages/dashboard/DashboardHome'

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
  ])

  return <RouterProvider router={router} />
}

export default App
