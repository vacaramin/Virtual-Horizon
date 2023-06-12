import { useState } from 'react'; 
import React from 'react';
import Calendar from 'react-calendar';
import './Home.css';

function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date()); // Set initial state to today

  return (
    <div className="home-container">
      <div className="box welcome-box">
        <h1 className="box-title">Welcome to the Teachers Dashboard</h1>
        <div className="box-content">
          <h3 style={{ textAlign: 'left' }}>Hello, {localStorage.username}!</h3>
          <p style={{ textAlign: 'left' }}>At Virtual Horizon, we believe in the power of education, regardless of geographical barriers. We are a leading remote school in Pakistan, dedicated to providing high-quality education to students through innovative virtual learning platforms. Our mission is to empower teachers with the tools and resources they need to deliver engaging and effective online education.</p>
        </div>
      </div>

      <div className="box notifications-box">
        <h1 className="box-title">Notifications</h1>
        <div className="box-content">
          <h3>Notification Details</h3>
          <p style={{ textAlign: 'left' }}>These are the details of the notifications.</p>
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