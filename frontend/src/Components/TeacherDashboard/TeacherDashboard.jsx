import React, { useState } from 'react';
import './TeacherDashboard.css';
import Sidebar from './Sidebar/Sidebar';
import TopBar from './TopBar/TopBar';
import ContentArea from './ContentArea/ContentArea';

function TeacherDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState("home"); // ["home", "classes", "notifications", "wallet", "settings"
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleItemClick = (itemName) =>{
    setSelectedItem(itemName);
  }

  return (
    <div className="dashboard-container">
      <Sidebar isSidebarOpen={isSidebarOpen} handleItemClick = {handleItemClick} toggleSidebar={toggleSidebar} selectedItem = {selectedItem} />
      <div className="main-content">
        <TopBar />
        <ContentArea className = "content-area" selectedItem = {selectedItem}/>
      </div>
    </div>
  );
}

export default TeacherDashboard;