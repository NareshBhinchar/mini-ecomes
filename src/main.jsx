import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './comman/MainLayout'
import Home from './Pages/Home'
import Cart from './Pages/Cart'
import Products from './Pages/Products'
import Login from './Pages/Login'
import Registet from './Pages/Registet'
import Maincontext from './comman/MainContext'


let router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: <Home />
        },

        {
          path: '/Cart',
          element: <Cart />
        },
        {
          path: '/Products',
          element: <Products />
        },
        {
          path: '/Login',
          element: <Login />,
        },


        {
          path: '/Register',
          element: <Registet />
        }

      ]
    }
  ]
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Maincontext>
      <RouterProvider router={router} />
    </Maincontext>
  </StrictMode>,
)
