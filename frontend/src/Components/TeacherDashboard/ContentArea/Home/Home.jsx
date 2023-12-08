import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "./Home.css";

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
      <div className="box welcome-box">
        <h1 className="box-title">Welcome to the Teachers Dashboard</h1>
        <div className="box-content">
          <h3 style={{ textAlign: "left" }}>Hello, {localStorage.username}!</h3>
          <p style={{ textAlign: "left" }}>
            At Virtual Horizon, we believe in the power of education, regardless
            of geographical barriers. We are a leading remote school in
            Pakistan, dedicated to providing high-quality education to students
            through innovative virtual learning platforms. Our mission is to
            empower teachers with the tools and resources they need to deliver
            engaging and effective online education.
          </p>
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

      <div className="box calendar-box">
        <h1 className="box-title">Calendar</h1>
        <div className="box-content">
          <Calendar
            value={selectedDate}
            onChange={setSelectedDate}
            defaultValue={new Date()}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
