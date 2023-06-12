import React from "react";
import "./Sidebar.css";
import menuIcon from "./menu-icon.svg";
import home from "./Logos of Teacher Dashboard/Home.svg";
import settings from "./Logos of Teacher Dashboard/Settings.svg";
import notification from "./Logos of Teacher Dashboard/Notifications.svg";
import classes from "./Logos of Teacher Dashboard/Class-links.svg";
import wallet from "./Logos of Teacher Dashboard/Wallet.svg";
import report from './Logos of Teacher Dashboard/report.png'
function Sidebar(props) {
  const { isSidebarOpen, toggleSidebar , handleItemClick, selectedItem} = props;

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
        <div className = {`sidebar-item ${selectedItem === "classes" ? "selected" : ""}`} onClick={ () => handleItemClick('classes')}>
          <img src={classes} alt="Settings icon" />
          {isSidebarOpen && <span>Classes</span>}
        </div>

        <div className={`sidebar-item ${selectedItem === "notifications" ? "selected" : ""}`} onClick={ () => handleItemClick('notifications')}>
          <img src={notification} alt="Settings icon" />
          {isSidebarOpen && <span>Notifications</span>}
        </div>

        <div className={`sidebar-item ${selectedItem === "wallet" ? "selected" : ""}`} onClick={ () => handleItemClick('wallet')}>
          <img src={wallet} alt="Settings icon" />
          {isSidebarOpen && <span>Wallet</span>}
        </div>
        <div className={`sidebar-item ${selectedItem === "settings" ? "selected" : ""}`} onClick={ () => handleItemClick('settings')}>
          <img src={settings} alt="Settings icon" />
          {isSidebarOpen && <span>Settings</span>}
        </div>

        <div className="sidebar-footer">
        <img src={report} alt="Settings icon" />
          {isSidebarOpen && <span>Report a Problem</span>}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
