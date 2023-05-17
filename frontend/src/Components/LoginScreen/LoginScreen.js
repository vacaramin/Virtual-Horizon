
import './LoginScreen.css';
import { Link } from 'react-router-dom';
import React from 'react';
import logo from './logo.svg'
function LoginScreen(props) {
    return (
        <div className="LoginScreen">
            <div className='left-rectangle'>
                <div className='rectangle'>
                    <img src={logo} alt='logo' class = "login-logo" />
                </div>
                
                <div >    
                    <div className='Welcome-Text'>Welcome to Virtual Horizon</div>
                </div>

                <div style={{ display: "block" }}>
                 
                    <input className='input-email1' id="email" placeholder="Email"/>
                 
                    <input className='input-pw1' id="password" placeholder='Password' type='password'/>
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

            <div className='right-image'>
    <div className='background'></div>
    <img src={logo} alt='logo' className='login-logo' />
</div>

        </div>
    );
}

export default LoginScreen;
