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
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} handleItemClick={handleItemClick} selectedItem={selectedItem} />
      <div className="content-wrapper">
        <TopBar />
        <div className="main-content">
          <ContentArea selectedItem={selectedItem} />
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;