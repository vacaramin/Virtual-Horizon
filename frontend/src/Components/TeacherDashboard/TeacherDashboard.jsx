import React, { useState } from 'react';
import './TeacherDashboard.css';
import Sidebar from './Sidebar/Sidebar';
import TopBar from './TopBar/TopBar';
import ContentArea from './ContentArea/ContentArea';

function TeacherDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-container">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="main-content">
        <TopBar />
        <ContentArea className = "content-area"/>
      </div>
    </div>
  );
}

export default TeacherDashboard;