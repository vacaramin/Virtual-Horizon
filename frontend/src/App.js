import './App.css';
import React from 'react';

import { Link } from 'react-router-dom';
import logo from "./logo.svg";

function App() {
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
        <div className='Button1'>
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

export default App;
