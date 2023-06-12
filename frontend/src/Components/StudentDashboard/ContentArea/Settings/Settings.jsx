import React, { useState } from "react";
import "./Settings.css";

function Settings() {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUpdateInfo = () => {
    // Handle update info logic here, e.g., make API request to update user info
    console.log("Full Name:", fullName);
    console.log("Password:", password);
    console.log("Email:", email);
  };
  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    // Handle the file upload logic here, e.g., make API request to upload the file
    console.log("Uploaded file:", file);
  };

  return (
    <div className="profile-settings">
      <div className="profile-settings-right">
        <div className="profile-photo">{/* Photo display */}</div>
        <div className="photo-upload">
          <label htmlFor="profilePictureInput" className="upload-button">
            Upload New Picture
          </label>
          <input
            type="file"
            id="profilePictureInput"
            className="file-input"
            onChange={handleProfilePictureUpload}
          />
        </div>
      </div>
      <div className="profile-settings-left">
        <h2>Profile Settings</h2>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={handleFullNameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <button className="update-btn" onClick={handleUpdateInfo}>
          Update Info
        </button>
      </div>
    </div>
  );
}

export default Settings;
