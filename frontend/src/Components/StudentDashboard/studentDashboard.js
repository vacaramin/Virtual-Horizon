import React, { useState, useEffect } from 'react';
import './studentDashboard.css';
import Sidebar from './Sidebar/Sidebar';
import TopBar from './TopBar/TopBar';
import ContentArea from './ContentArea/ContentArea';

function StudentDashboard() {
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState("home");
  const [username, setUsername] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
  };

  const getUserDetails = () => {
    fetch("http://localhost:4000/user/GetProfileFromToken", {
      method: "GET",
      credentials: "include",
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === "success") {
        setUsername(data.user.name);
      }
    })
    .catch(error => {
      console.error("Error fetching user details:", error);
    });
  };

  useEffect(() => {
    getUserDetails();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <div className="dashboard-container">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} handleItemClick={handleItemClick} selectedItem={selectedItem} />
      <div className="content-wrapper">
        <TopBar username = {username}/>
        <div className="main-content">
          <ContentArea selectedItem={selectedItem} />
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;