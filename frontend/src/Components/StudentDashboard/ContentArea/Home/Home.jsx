import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="box welcome-box">
        <h1 className="box-title">Welcome to the Student Dashboard</h1>
        <div className="box-content">
          <h3>Hello, {localStorage.username}!</h3>
          <p> This is the welcome content for the student dashboard.</p>
        </div>
      </div>

      <div className="box notifications-box">
        <h1 className="box-title">Notifications</h1>
        <div className="box-content">
          <h3>Notification Details</h3>
          <p>These are the details of the notifications.</p>
        </div>
      </div>

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
