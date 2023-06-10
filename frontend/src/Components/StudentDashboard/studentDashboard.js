import React, { useState } from 'react';
import './studentDashboard.css';
import Sidebar from './Sidebar/Sidebar';
import TopBar from './TopBar/TopBar';
import ContentArea from './ContentArea/ContentArea';

function StudentDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState("home");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
  };

  return (
    <div className="dashboard-container">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} handleItemClick = {handleItemClick} selectedItem = {selectedItem}/>
      <div className="main-content">
        <TopBar />
        <ContentArea className = "content-area" selectedItem={selectedItem} />
      </div>
    </div>
  );
}

export default StudentDashboard;