import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = `http://localhost:4000/notification/getnotifications`;

    axios
      .get(apiUrl, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json", // Adjust content type as needed
        },
      })
      .then((response) => {
        console.log("Get Notification", response);
        setNotifications(response.data.EnrollmentController);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
        setLoading(false);
        setNotifications([]);
      });
  }, []);

  return (
    <div className="home-container">
      {/* Welcome Box */}
      <div className="box welcome-box">
        <h1 className="box-title">Welcome to the Student Dashboard</h1>
        <div className="box-content">
          <h3>Hello, {localStorage.username}!</h3>
          <p>This is the welcome content for the student dashboard.</p>
        </div>
      </div>

      {/* Notifications Box */}
      <div className="box notifications-box">
        <h1 className="box-title">Notifications</h1>
        <div className="box-content">
          {loading ? (
            <p>Loading notifications...</p>
          ) : notifications.length === 0 ? (
            <p>No notifications available.</p>
          ) : (
            notifications.map((notification, index) => (
              <div key={notification.created_at} className="notification-row">
                <div className="notification-text">
                  <h3>{notification.message}</h3>
                </div>
                <div className="notification-status">{notification.status}</div>
                <div className="notification-date">
                  {notification.created_at
                    ? new Date(notification.created_at).toLocaleString()
                    : "N/A"}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* To-Do Box */}
      <div className="box to-do-box">
        <h1 className="box-title">To Do</h1>
        <div className="box-content">
          <h3>Task 1</h3>
          <p>This is the description of Task 1.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
