
import './LoginScreen.css';
import React from 'react';
import logo from './logo.svg'
import Signin from './Signin/Signin';
import { useNavigate } from "react-router-dom";

function LoginScreen(props) {
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
        <div className="LoginScreen">

            <Signin type={props.type} />

            <div className='right-image'>
                <div className='background'></div>
                <img src={logo} alt='logo' className='login-logo1' />
            </div>

        </div>
    );
}

export default LoginScreen;
