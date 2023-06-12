import React from 'react';
import './TopBar.css';
import logo from './logo.svg';
import profilePic from './profile-pic.jpg';

function TopBar() {
  return (
    <div className="top-bar">
      <div className="logo-container1">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="center-texts">
        <h2>Virtual Horizon</h2>
      </div>
      <div className="profile-info">
        <p>Welcome, {localStorage.username}!</p>
        <img src={profilePic} alt="Profile" className="profile-pic" />
      </div>
    </div>
  );
}

export default TopBar;