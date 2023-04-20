import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from './mainLayout/MainLayout';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import RegisterRBS from './components/RegisterRBS/RegisterRBS';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterBS from './components/RegisterBS/RegisterBS';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/register-bs',
        element: <RegisterBS></RegisterBS>
      },
      {
        path: '/register-rbs',
        element: <RegisterRBS></RegisterRBS>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
