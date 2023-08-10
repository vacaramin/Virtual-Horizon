import React, { useState, useEffect } from "react";
import "./Settings.css";

function Settings() {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/GetProfileByID/5")
      .then(response => response.json())
      .then(data => {
        setUser(data.user);
        console.log(data.user);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleUpdateInfo = () => {
    console.log("Updated user data:", user);
    setEditing(false);
    // Make API request to update user info
    fetch("http://localhost:4000/UpdateProfile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(data => {
        console.log("Update successful:", data);
      })
      .catch(error => {
        console.error("Error updating user data:", error);
      });
  };

  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    console.log("Uploaded file:", file);
    // Make API request to upload profile picture
    // ...
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
            value={user.Name || ""}
            readOnly={!editing}
            onChange={(e) => setUser({ ...user, Name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={user.Password || ""}
            readOnly={!editing}
            onChange={(e) => setUser({ ...user, Password: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={user.Email || ""}
            readOnly={!editing}
            onChange={(e) => setUser({ ...user, Email: e.target.value })}
          />
        </div>
        {/* Render other fields similarly */}
        {editing ? (
          <button className="update-btn" onClick={handleUpdateInfo}>
            Save
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
