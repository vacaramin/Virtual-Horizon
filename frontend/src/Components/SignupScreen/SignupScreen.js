
import './SignupScreen.css';

import { Link } from 'react-router-dom';
import React from 'react';
function SignupScreen() {
  return (
    <div className="SignupScreen">
            <div className='left-rectangle'>
                <div className='rectangle'></div>
                <div style={{textAlign: "center"}}>
                    <div className='Welcome-Text'>Welcome to Virtual Horizon</div>
                </div>

                <div style={{ display: "block" }}>
                    <label htmlFor="email" className='EmailText'>Email</label>
                    <br />

                    <input className='input-email' id="email" />
                    <br />

                    <label htmlFor="password" className='passwordTex'>Password</label>
                    <br />
                    <input className='input-pw' id="password" />
                </div>
                <div>

                    <Link to="/home">
                        <div className='signinButton'>
                            Sign up
                        </div>
                    </Link>

                </div>

                <div className='login-text'><i>Already registered? <Link to="/login">Login here</Link></i></div>
            </div>

            <div className='right-image'></div>




        </div>
  );
}

export default SignupScreen;
