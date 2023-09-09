import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Settings.css";

function Settings() {
  const [userInfo, setUserInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const GetUserData = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/user/GetProfileFromToken",
        {
          method: "GET",
          credentials: "include",
        }
      );
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
    try {
      const response = fetch("http://localhost:4000/user/UpdateProfileFromToken", {
          method: "PUT",
          credentials: "include",
        });
        //need to write some logic here
      setIsEditing(false);

      const data = await response.json();
      if (data.status === "success"){
        console.log(data.message)
      }else{
        console.log(data.message)
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };
  const handleEditClick = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    GetUserData();
  }, []);
  const handleDateChange = (date) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      dob: date.toISOString(), // Save the date in ISO format
    }));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [id]: value,
    }));
  };

  return (
    <div className="profile-settings">
      <div className="profile-settings-right">
        <div className="profile-photo">
          <img
            src="https://avatars.githubusercontent.com/u/68877880?v=4"
            alt="Profile"
            className="profile-photo-img"
          />
        </div>

        <div className="photo-upload">
          <label htmlFor="profilePictureInput" className="upload-button">
            Upload New Picture
          </label>
          <input type="file" id="profilePictureInput" className="file-input" />
        </div>
        <br /><br />
        <div>
          <label>
            <b>About me</b>
          </label>
          {isEditing ? (
            <input
              type="text"
              id="aboutme"
              defaultValue={userInfo.aboutme}
              onChange={handleInputChange}
              className="form-input"
            />
          ) : (
            <p className="field" id="aboutme">
              {userInfo.aboutme}
            </p>
          )}
        </div>
      </div>
      
      <div className="profile-settings-left">
        <h2>Profile Settings</h2>

        <div className="form-group">
          <label>
            <b>Name</b>
          </label>
          {isEditing ? (
            <input
              type="text"
              id="fullName"
              defaultValue={userInfo.name}
              onChange={handleInputChange}
              className="form-input"
            />
          ) : (
            <p className="field" id="fullName">
              {userInfo.name}
            </p>
          )}
        </div>

        <div className="form-group">
          <label>
            <b>Date of Birth</b>
          </label>
          {isEditing ? (
            <DatePicker
              selected={new Date(userInfo.dob)}
              onChange={(date) => handleDateChange(date)}
              className="form-input"
            />
          ) : (
            <p className="field" id="DOB">
              {new Date(userInfo.dob).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
        </div>

        <div className="form-group">
          <label>
            <b>Email Address</b>
          </label>
          {isEditing ? (
            <input
              type="email"
              id="email"
              value={userInfo.email}
              onChange={handleInputChange}
              className="form-input"
            />
          ) : (
            <p className="field">{userInfo.email}</p>
          )}
        </div>

        <div className="form-group">
          <label>
            <b>Gender</b>
          </label>
          {isEditing ? (
            <select
              id="gender"
              value={userInfo.gender}
              onChange={handleInputChange}
              className="form-input"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="field">{userInfo.gender}</p>
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
