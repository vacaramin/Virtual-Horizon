import './SignupScreen.css';
import { Link } from 'react-router-dom';
import React from 'react';
import logo from './logo.svg'
import logo2 from './Logo2.svg'
import SignupForm from './SignupForm/SignUpForm';
function SignupScreen() {
    return (

        <div className="SignupScreen">
            <div className='left-rectangle'>
            <img src={logo2} alt="logo" width={'100%'} style={{position: 'absolute', opacity:0.08, marginBottom: '5%'}} />
      
                <div className='Welcome-Text1'>Welcome to Virtual Horizon</div>
                <br/>
                
                <SignupForm class = "sign-up-form" />
                {/* 

                <div style={{ display: "block" }}>

                    <input className='input-name' id="name" placeholder='Name' />
                    <br />
                    <input className='input-email' id="email" placeholder='email'/>
     
                    <br />
                    
                    <input className='input-pw' id="password"  type = 'password' placeholder='password'/>
                    
                    <br />
                    <input className='input-contact' id="Contact" placeholder='Contact Number'/>
                
                </div>
                <div>

                    <Link to="/login-student">
                        <div className='signinButton'>
                            Sign Up
                        </div>
                    </Link>

                </div> */}

                <div className='sign-up-text'><i style={{ textAlign: "center" }}>Already Registered? <Link to="/login-student">Login</Link></i></div>

            </div>

            <div className='right-image'>
                <div className='background'></div>
                <img src={logo} alt='logo' className='login-logo1' />
            </div>




        </div>

    );
}

export default SignupScreen;