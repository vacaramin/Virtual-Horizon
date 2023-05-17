import ReactDOM from 'react-dom';
import './index.css';
import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupScreen from './Components/SignupScreen/SignupScreen'
import LoginScreen from './Components/LoginScreen/LoginScreen';
import StudentDashboard from './Components/StudentDashboard/studentDashboard'
import App from './App';
import TeacherDashboard from './Components/TeacherDashboard/TeacherDashboard';
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
    element: <StudentDashboard/>,
  },
  {
    path: "/teacher",
    element: <TeacherDashboard/>,
  },
  
  
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);