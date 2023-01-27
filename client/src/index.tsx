import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider, Route, createRoutesFromElements} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Quiz from './components/Quiz';
import Register from './components/Register';
import Results from './components/Results';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
