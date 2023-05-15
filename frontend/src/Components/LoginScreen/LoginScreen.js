
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

                    <label htmlFor = "email" className='EmailText'>Email</label>
                    <br/>

                    <input className='input' id = "email"/>
                    <br/>

                    <label htmlFor = "password" className='passwordTex'>Password</label>
                    <br/>
                    <input className='input' id = "password"/>
                    
                    
                </div>
            
                <Link to="home">
                        <div className='signinButton'>
                            Sign in
                        </div>
                    </Link>

            </div>

            <div className='right-image'></div>




        </div>
    );
}

export default LoginScreen;
