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
import App from './App';
import { RecoilRoot } from "recoil";

const router = createBrowserRouter([
  {
    path: '/:loginId',
    element: <Homepage />
  },
  {
    path: 'quiz/:loginId',
    element: <Quiz />
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'Register',
    element: <Register />
  },
  {
    path: "Results/:loginId",
    element: <Results />
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <React.StrictMode>
    <RecoilRoot>
    <RouterProvider router={router} />
    <App />
    </RecoilRoot>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
