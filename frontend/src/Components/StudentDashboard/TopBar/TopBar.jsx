import React, { useState } from "react";

import "./TopBar.css";
import logo from "./logo.svg";
import profilePic from "./profile-pic.jpg";

function TopBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="top-bar">
      <div className="logo-container1">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="center-text">
        <h2>Virtual Horizon</h2>
      </div>
      <div className="profile-info">
        <p>Welcome, {localStorage.username}</p>
        <img src={profilePic} alt="Profile" className="profile-pic" />
      </div>
      {/* Adding the dropdown */}
      <div className="dropdown">
        <button
          className="dropdown-button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          ☰
        </button>
        <div className={`dropdown-content ${dropdownOpen ? "show" : ""}`}>
          <a href="s" className="dropdown-item">
            Log out
          </a>
          <a href="s" className="dropdown-item">
            Log out
          </a>
          <a href="s" className="dropdown-item">
            Log World out
          </a>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
