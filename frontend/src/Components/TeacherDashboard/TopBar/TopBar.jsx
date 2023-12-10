import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TopBar.css";
import logo from "./logo.svg";


function TopBar(props) {
  const username = props.username;
  const history = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleLogout = () => {
    fetch("http://localhost:4000/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          localStorage.removeItem("token");
          // Removing authorization token cookie
          document.cookie =
            "authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          history("/");
        }
      });
  };
  return (
    <div className="top-bar">
      <div className="logo-container1">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="center-text">
        <h2>Virtual Horizon</h2>
      </div>

      <div className="profile-info">
        <p>Welcome, {username}</p>
        <div className="profile-container">
          <img
            src="https://avatars.githubusercontent.com/u/68877880?v=4"
            alt="Profile"
            className="profile-pic"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
        </div>

        <div className={styles["dropdown"]}>
          <button
            className="dropdown-button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            ☰
          </button>
          <div className={`dropdown-content ${dropdownOpen ? "show" : ""}`}>
            <div onClick={handleLogout} className="dropdown-item">
              Log out
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
