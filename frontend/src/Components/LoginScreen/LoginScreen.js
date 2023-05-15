
import './LoginScreen.css';
import { Link } from 'react-router-dom';
import React from 'react';
function LoginScreen() {
    return (
        <div className="LoginScreen">
            <div className='left-rectangle'>
                <div className='rectangle'></div>
                <div >
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
                            Sign in
                        </div>
                    </Link>

                </div>

                <div className='sign-up-text'><i>new here? <Link to="/sign-up">Sign up</Link></i></div>
            </div>

            <div className='right-image'></div>




        </div>
    );
}

export default LoginScreen;
