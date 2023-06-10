import React, {useState} from "react";
import "./Signin.css";

import logo2 from "./Logo2.svg";
import { Link } from "react-router-dom";
import {
  TextField,
} from "@mui/material";

function Signin(props) {
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin_Teacher = () => {
    const payload = { email, password };
    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(payload),
    })
    .then((response) => response.json())
    .then((data) => {
    //if responsce is ok
      if (data.status === "ok") {
        console.log("Login Successful");
      } else {
        console.log("Login Failed");
      }

      console.log(data);
      //strong the recieving token in data to local browswer cookies
      localStorage.setItem("token", data.token);
      //setting cookie authorization token
      document.cookie = `authorization=${data.token}`;
      //redirect to home page
      window.location.href = "/home-teacher";
      window.location.replace('/home-teacher');
      //redirect to home page
     
    })
    .catch((error) => {
      console.log(error);
      });
      
  }
  const handleLogin_Student = () => {
    const payload = { email, password };
    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(payload),
    })
    .then((response) => response.json())
    .then((data) => {
    //if responsce is ok
      if (data.status === "ok") {
        console.log("Login Successful");
      } else {
        console.log("Login Failed");
      }

      console.log(data);
      //strong the recieving token in data to local browswer cookies
      localStorage.setItem("token", data.token);
      //setting cookie authorization token
      document.cookie = `authorization=${data.token}`;
      //redirect to home page
      window.location.href = "/home-student";
      window.location.replace('/home-student');
      //redirect to home page
     
    })
    .catch((error) => {
      console.log(error);
      });
      
  }


  if (props.type === "student") {
    return (
      <div className="left-rectangle">
        <div className="rectangle">
          <img
            src={logo2}
            alt="logo"
            width={"100%"}
            style={{ opacity: 0.05, marginBottom: "5%" }}
          />
        </div>
        
        

        <div>
          <div className="Welcome-Text">
            Welcome to Virtual Horizon
            <br />{" "}
          </div>
        </div>

        <div>
          <TextField 
          id="Email" 
          label="Email" 
          halfWidth 
          style={{marginTop: "20%", marginLeft:'32%'}}
          value = {email}
          onChange={(e) => setEmail(e.target.value)} />
          <br />
          <TextField id="Password"
            type = "password"
            label="Password"
            style={{marginTop: "3%", marginLeft:'32%'}}
            halfWidth
            value  = {password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <div>
            <div className="signinButton" onClick={handleLogin_Student}>Sign in</div>
          
        </div>

        <div className="sign-up-text">
          <i>
            new here? <Link to="/sign-up">Sign up</Link>
          </i>
        </div>
      </div>
    );
  } else if (props.type === "teacher") {
    return (
      <div className="left-rectangle">
        <div className="rectangle">
          <img
            src={logo2}
            alt="logo"
            width={"100%"}
            style={{ opacity: 0.05, marginBottom: "5%" }}
          />
        </div>
        
        

        <div>
          <div className="Welcome-Text">
            Welcome to Virtual Horizon
            <br />{" "}
          </div>
        </div>

        <div>
          <TextField 
          id="Email" 
          label="Email" 
          halfWidth 
          style={{marginTop: "20%", marginLeft:'32%'}}
          value = {email}
          onChange={(e) => setEmail(e.target.value)} />
          <br />
          <TextField id="Password"
            type = "password"
            label="Password"
            style={{marginTop: "3%", marginLeft:'32%'}}
            halfWidth
            value  = {password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <div>
            <div className="signinButton" onClick={handleLogin_Teacher}>Sign in</div>
          
        </div>

        <div className="sign-up-text">
          <i>
            new here? <Link to="/sign-up">Sign up</Link>
          </i>
        </div>
      </div>
    );
  } else {
    console.log(
      "In Signin component only accepted values of props are teacher or student"
    );
    return <div>Sign in Component failed to load</div>;
  }
}
export default Signin;
