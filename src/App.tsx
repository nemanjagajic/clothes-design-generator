import React from 'react'
import './styles/globals.css'
import { v4 as uuidv4 } from 'uuid'
import LandingPage from "./pages/landing/LandingPage"
import { createBrowserRouter, RouterProvider,} from "react-router-dom"
import DashboardHome from "./pages/dashboard/DashboardHome";

const userId = uuidv4()

function App() {

  const router = createBrowserRouter([
    {
      path: "/dashboard",
      element: <DashboardHome />
    },
    {
      path: "/",
      element: <LandingPage />
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
