import React, { useState } from "react";
import "./Settings.css";

function Settings() {
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    password: "",
    email: ""
    // Add more fields here
  });

  const handleUpdateInfo = async () => {
    try {
      const response = await fetch("your-update-api-endpoint", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userInfo)
      });

      if (response.ok) {
        console.log("User information updated successfully");
        // You can update the UI or perform other actions after successful update
      } else {
        console.error("Failed to update user information");
      }
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [id]: value
    }));
  };

  return (
      <div className="profile-settings">
        <div className="profile-settings-right">
          <div className="profile-photo">
            {/* Display profile photo here */}
            <img
              src="your-profile-photo-url"
              alt="Profile"
              className="profile-photo-img"
            />
          </div>
          <div className="photo-upload">
            <label htmlFor="profilePictureInput" className="upload-button">
              Upload New Picture
            </label>
            
            <input
              type="file"
              id="profilePictureInput"
              className="file-input"
           //   onChange={handleProfilePictureUpload}
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
              value={userInfo.fullName}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={userInfo.password}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={userInfo.email}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          {/* Add more fields using the same pattern */}
          <button className="update-btn" onClick={handleUpdateInfo}>
            Update Information
          </button>
        </div>
      </div>
   
  );
}

export default Settings;
