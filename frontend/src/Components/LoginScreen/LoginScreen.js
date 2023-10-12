import React, { useState, useEffect } from 'react';
import './LoginScreen.css';
import logo from './logo.svg';
import Signin from './Signin/Signin';
import { useNavigate } from 'react-router-dom';
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay';

function LoginScreen(props) {
    const [isPending, setIsPending] = useState(true);

    const history = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4000/user/GetProfileFromToken', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.status === 401) {
                    setIsPending(false);
                    return;
                }

                const data = await response.json();

                if (data.status === 'success') {
                    console.log('success');
                    if (data.user.role === 'student') {
                        console.log('student');
                        history('/home-student');
                    } else if (data.user.role === 'teacher') {
                        history('/home-teacher');
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setIsPending(false);
        };

        fetchData();
    }, []); // Empty dependency array to run once when component mounts

    return (
        <div className="LoginScreen">
            <Signin type={props.type} />

            <div className="right-image">
                <div className="background"></div>
                <img src={logo} alt="logo" className="login-logo1" />
            </div>
            {isPending && <LoadingOverlay />}
        </div>
    );
}

export default LoginScreen;
