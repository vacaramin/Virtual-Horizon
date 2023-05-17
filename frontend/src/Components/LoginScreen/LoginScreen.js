
import './LoginScreen.css';
import React from 'react';
import logo from './logo.svg'
import Signin from './Signin/Signin';
function LoginScreen(props) {
    return (
        <div className="LoginScreen">
            
            <Signin type ={props.type}/>

            <div className='right-image'>
    <div className='background'></div>
    <img src={logo} alt='logo' className='login-logo' />
</div>

        </div>
    );
}

export default LoginScreen;
