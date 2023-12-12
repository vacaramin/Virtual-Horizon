import React, { useState } from "react";
import "./Signin.css";
import logo2 from "./Logo2.svg";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import ErrorNotification from "../../ErrorNotification/ErrorNotification";

function Signin(props) {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin_Teacher = () => {
    setError("");
    const payload = { email, password };
    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          console.log("Login Successful");
          localStorage.setItem("Authorization", data.Authorization);
          // Setting authorization token cookie
          document.cookie = `Authorization=${data.Authorization}`;
          history("/home-teacher");
        } else if (data.status === "failed") {
          console.log("Login Failed");
          console.log(data);
          setError(data.error);
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };
  // PROMISE
  const handleLogin_Student = () => {
    setError("");
    const payload = { email, password };
    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          console.log("Login Successful");
          localStorage.setItem("Authorization", data.Authorization);
          // Setting authorization token cookie
          document.cookie = `Authorization=${data.Authorization}`;
          if (data.role === "tutor") {
            history("/home-teacher/home");
          }else if (data.role === "student") {
            history("/home-student/home");
          }
        } else if (data.status === "failed") {
          console.log("Login Failed");

          setError(data.error);
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };
  const handleEnterEmail = (e) => {
    if (e.key === "Enter") {
      document.getElementById("Password").focus();
    }
  };

  const handleEnterPassword = (e) => {
    if (e.key === "Enter") {
      if (props.type === "student") {
        handleLogin_Student();
      } else {
        handleLogin_Teacher();
      }
    }
  };

  return (
    <div className="login">
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
            style={{ marginTop: "20%", marginLeft: "32%" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleEnterEmail}
          />
          <br />
          <TextField
            id="Password"
            type="password"
            label="Password"
            style={{ marginTop: "3%", marginLeft: "32%" }}
            halfWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleEnterPassword}
          />
        </div>
        <div>
          <button
            className="signinButton"
            onClick={
              props.type === "student"
                ? handleLogin_Student
                : handleLogin_Teacher
            }
            type="submit"
          >
            Sign in
          </button>
        </div>

        <div className="sign-up-text">
          <i>
            new here? <Link to="/sign-up">Sign up</Link>
          </i>
        </div>
        <ErrorNotification error={error} color="red" />
      </div>
    </div>
  );
}
export default Signin;
