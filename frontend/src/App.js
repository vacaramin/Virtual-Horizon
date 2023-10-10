import './App.css';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from "./logo.svg";
import { useNavigate } from "react-router-dom";

function App() {
  const history = useNavigate();

  const fetchData = async () => {
      try {
          const response = await fetch("http://localhost:4000/user/GetProfileFromToken", {
              method: "GET",
              credentials: "include",
          });

          if (response.status === 401) {
              return;
          }

          const data = await response.json();

          if (data.status === "success") {
              console.log("success")
              if (data.user.role === "student") {
                  console.log("student")
                  history("/home-student");
              } else if (data.user.role === "teacher") {
                  history("/home-teacher");
              }
          }
      } catch (error) {
          console.error("Error fetching data:", error);
      }
  };

  fetchData();


  return (
    <div className="App">
      <p className='omage'>
        <span className='t1'>Virtual</span>
        <span>Horizon</span>
      </p>
      <div className='logo-container'>
        <img src={logo} className='appimg' alt='logo' />
      </div>
      
      <Link to="/login-student">
        <div className='Button1' >
          Student Login
        </div>
      </Link>

      <Link to="/sign-up">
        <div className='Button2'>
          Student Sign up
        </div>
      </Link>
      <Link to="/login-teacher">
        <div className='Button3'>
          Teacher Login
        </div>
      </Link>

      <Link to="/sign-up">
        <div className='Button4'>
          Become a Teacher/Tutor
        </div>
      </Link>
    </div>
  );
}
// react browser router

export default App;
