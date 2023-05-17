
import './SignupScreen.css';
import { Link } from 'react-router-dom';
import React from 'react';
function SignupScreen() {
    return (
        
        <div className="SignupScreen">
            <div className='left-rectangle'>
                <div >
                    <div className='Welcome-Text'>Welcome to Virtual Horizon</div>
                </div>

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

                    <Link to="/login">
                        <div className='signinButton'>
                            Sign Up
                        </div>
                    </Link>

                </div>

                <div className='sign-up-text'><i style={{textAlign:"center"}}>Already Registered? <Link to="/login">Login</Link></i></div>
            </div>

            <div className='right-image'></div>




        </div>

    );
}

export default SignupScreen;