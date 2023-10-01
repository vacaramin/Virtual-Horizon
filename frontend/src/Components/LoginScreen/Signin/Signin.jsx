import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signin.css";
import logo2 from "./Logo2.svg";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import ErrorNotification from "../../ErrorNotification/ErrorNotification";

function Signin(props) {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:4000/user/GetProfileFromToken", {
        method: "GET",
        credentials: "include",
      });
  
      if (response.status === 401) {
        // Handle unauthorized access
        console.error("Unauthorized access");
        return;
      }
  
      const data = await response.json();
  
      if (data.status === "success") {
        if (data.user.role === "student") {
          history.push("/home-student");
        } else if (data.user.role === "teacher") {
          history.push("/home-teacher");
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  fetchData();

  const handleLogin_Teacher = () => {
    const payload = { email, password };
    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        //if responsce is ok
        if (data.status === "success") {
          console.log("Login Successful");
          //strong the recieving token in data to local browser cookies
          localStorage.setItem("Authorization", data.Authorization);

          //setting cookie authorization token
          document.cookie = `Authorization=${data.Authorization}`;

          //redirect to home page
          history("/home-teacher");

          //redirect to home page
        }
        if (data.status === "failed") {
          console.log("Login Failed");

          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
          history("/home-student");
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
  const handleEnterEmail = (e) => {
    if (e.key === "Enter") {
      document.getElementById("Password").focus();
    }
  };

  const handleEnterPassword = (e) => {
    if (e.key === "Enter") {
      handleLogin_Student(); // You can adjust this to your needs
    }
  };

  if (props.type === "student") {
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
              onClick={handleLogin_Student}
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
  } else if (props.type === "teacher") {
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
            <div className="signinButton" onClick={handleLogin_Teacher}>
              Sign in
            </div>
          </div>

          <div className="sign-up-text">
            <i>
              new here? <Link to="/sign-up">Sign up</Link>
            </i>
          </div>
          <ErrorNotification error={error} />
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
