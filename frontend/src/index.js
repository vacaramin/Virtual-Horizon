import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupScreen from './Components/SignupScreen/SignupScreen'
import LoginScreen from './Components/LoginScreen/LoginScreen';
import studentDashboard from './Components/Student-Dashboard/student-Dashboard'
const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/sign-up",
    element: <SignupScreen/>,
  },
  {
    path: "/login",
    element: <LoginScreen/>,
  },
  {
    path: "/home",
    element: <studentDashboard/>,
  },
  
  
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);