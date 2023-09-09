import React, { useState, useEffect } from "react";
import "./Settings.css";

function Settings() {
  const [userInfo, setUserInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);


  const GetUserData = async () => {
    try {
      const response = await fetch("http://localhost:4000/user/GetProfileFromToken", {
        method: "GET",
      credentials: "include",
      });
      const data = await response.json();
      if (data.status === "success") {
        setUserInfo(data.user);
        console.log(JSON.stringify(data.user, null, 2));
      } else {
        console.log("Failed to load user data");
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };
  
  const handleUpdateInfo = async () => {
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };
  useEffect(() => {
    GetUserData();
  }, []);

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
            <label htmlFor="fullName">Name</label>
            {isEditing ? (<input
              type="text"
              id="fullName"
              defaultValue={userInfo.name}
              onChange={handleInputChange}
              className="form-input"
            />):(
              <p id ="fullName">{userInfo.name}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="DOB">Date of Birth</label>
            {isEditing ? (
            <input
              type="DOB"
              id="DOB"
              value={userInfo.dob}
              onChange={handleInputChange}
              className="form-input"
            />
            ):(
              <p id="DOB">{userInfo.dob}</p>
            )}
          </div>

          <div className="form-group">
          <label>Email Address</label>
          {isEditing ? (
            <input
              type="email"
              id="email"
              value={userInfo.email}
              onChange={handleInputChange}
              className="form-input"
            />
          ) : (
            <p>{userInfo.email}</p>
          )}
          </div>
          <div className="form-group">
          <label>Gender</label>
          {isEditing ? (
            <input
              type="text"
              id="gender"
              value={userInfo.gender}
              onChange={handleInputChange}
              className="form-input"
            />
          ) : (
            <p>{userInfo.gender}</p>
          )}
          </div>

          
          {isEditing ? (
          <button className="update-btn" onClick={handleUpdateInfo}>
            Update Information
          </button>
        ) : (
          <button className="edit-btn" onClick={handleEditClick}>
            Edit
          </button>
        )}
        </div>
      </div>
   
  );
}

export default Settings;
