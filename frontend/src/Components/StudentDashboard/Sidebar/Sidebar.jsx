import React from "react";
import "./Sidebar.css";
import menuIcon from "./menu-icon.svg";
import home from './Logo of Student Dashboard/Home.svg'
import subjecticon from './Logo of Student Dashboard/Subjects.svg'
import Tutor from './Logo of Student Dashboard/Tutor.svg'
import settings from './Logo of Student Dashboard/Setting.svg'
import VhAssistant from './Logo of Student Dashboard/Language_support.svg'
import Payment from './Logo of Student Dashboard/Payment.svg'
import vhAssistant from './Logo of Student Dashboard/VH.svg'

function Sidebar(props) {
  const { isSidebarOpen, toggleSidebar, handleItemClick, selectedItem} = props;
  
  return (
    <div className={`sidebar-menu ${isSidebarOpen ? "" : "collapsed"}`}>
      <div className="sidebar-header">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <img src={menuIcon} alt="Menu icon" />
        </button>
      </div>

      <div className="sidebar-items">
        <div className={`sidebar-item ${selectedItem === "home" ? "selected" : ""}`} onClick={ () => handleItemClick('home')}>
          <img src={home} alt="Home icon" />
          {isSidebarOpen && <span>Home</span>}
        </div>
        <div className={`sidebar-item ${selectedItem === "subjects" ? "selected" : ""}`} onClick = {() => handleItemClick('subjects')}>
          <img src={subjecticon} alt="Subjects icon" />
          {isSidebarOpen && <span>Subjects</span>}
        </div>


        <div className={`sidebar-item ${selectedItem === "tutor" ? "selected" : ""}`} onClick={ () => handleItemClick('tutor')}>
          <img src={Tutor} alt="Settings icon" />
          {isSidebarOpen && <span>Hire a Tutor</span>}
        </div>

        <div className={`sidebar-item ${selectedItem === "vhassistant" ? "selected" : ""}`} onClick = {() => handleItemClick('vhassistant')}>
          <img src={vhAssistant} alt="VH Assistant Icon" />
          {isSidebarOpen && <span>VH Assistant</span>}
        </div>

        <div className={`sidebar-item ${selectedItem === "payment" ? "selected" : ""}`} onClick = {() => handleItemClick('payment')}>
          <img src={Payment} alt="Payment Icon" />
          {isSidebarOpen && <span>Payment</span>}
        </div>

        
        
        <div className={`sidebar-item ${selectedItem === "settings" ? "selected" : ""}`} onClick={() => handleItemClick('settings')}>
          <img src={settings} alt="Settings icon" />
          {isSidebarOpen && <span>Settings</span>}
        </div>
      </div>
      <div className="sidebar-footer">
          <span>Report a problem</span>

      </div>
    </div>
  );
}

export default Sidebar;
