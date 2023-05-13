
import './LoginScreen.css';
import { Link } from 'react-router-dom';
import React from 'react';
function LoginScreen() {
    return (
        <div className="LoginScreen">
            <div className='left-rectangle'>
            <div className='signinButton' />
            <div >
                <div className='EmailText'>Email</div>
                <div className='signinText'>SignIn</div>
                <div className='passwordText'>Password</div>
                <div className='line1'></div>
                <div className='line2'></div>
                <Link to="home">
                    <div className='signinBoxText'>SignIn</div></Link>
            </div>
            </div>
            <div className='right-image'></div>

           


        </div>
    );
}

export default LoginScreen;
