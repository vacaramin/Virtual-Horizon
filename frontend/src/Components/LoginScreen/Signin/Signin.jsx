import React from "react";
import "./Signin.css";
import logo from "./logo.svg";

import logo2 from "./Logo2.svg";
import { Link } from "react-router-dom";
import {
  Button,
  Typography,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";

function Signin(props) {
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
          <TextField id="Email" label="Email" halfWidth style={{marginTop: "20%", marginLeft:'32%'}} />
          <br />
          <TextField id="Password" type = "password" label="Password" style={{marginTop: "3%", marginLeft:'32%'}} halfWidth />
        </div>
        <div>
          <Link to="/home-student">
            <div className="signinButton">Sign in</div>
          </Link>
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
          <img src={logo} alt="logo" class="login-logo" />
        </div>

        <div>
          <div className="Welcome-Text">Welcome to Virtual Horizon</div>
        </div>

        <div style={{ display: "block" }}>
          <input className="input-email1" id="email" placeholder="Email" />

          <input
            className="input-pw1"
            id="password"
            placeholder="Password"
            type="password"
          />
        </div>
        <div>
          <Link to="/home-teacher">
            <div className="signinButton">Sign in</div>
          </Link>
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
