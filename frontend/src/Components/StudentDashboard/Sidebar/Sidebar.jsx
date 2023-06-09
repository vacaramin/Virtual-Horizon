import React from "react";
import "./Sidebar.css";
import menuIcon from "./menu-icon.svg";
import home from './Logo of Student Dashboard/Home.svg'
import subjecticon from './Logo of Student Dashboard/Subjects.svg'
import timetable from './Logo of Student Dashboard/Time-Table.svg'
import Tutor from './Logo of Student Dashboard/Tutor.svg'
import classlinks from './Logo of Student Dashboard/Class-links.svg'
import reportcard from './Logo of Student Dashboard/Report-Card.svg'
import settings from './Logo of Student Dashboard/Setting.svg'
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

        <div className={`sidebar-item ${selectedItem === "timetable" ? "selected" : ""}`} onClick = {() => handleItemClick('timetable')}>
          <img src={timetable} alt="Settings icon" />
          {isSidebarOpen && <span>Time Table</span>}
        </div>

        <div className={`sidebar-item ${selectedItem === "tutor" ? "selected" : ""}`} onClick={ () => handleItemClick('tutor')}>
          <img src={Tutor} alt="Settings icon" />
          {isSidebarOpen && <span>Tutor</span>}
        </div>

        <div className={`sidebar-item ${selectedItem === "classlinks" ? "selected" : ""}`} onClick = {() => handleItemClick('classlinks')}>
          <img src={classlinks} alt="Settings icon" />
          {isSidebarOpen && <span>Class Links</span>}
        </div>

        <div className={`sidebar-item ${selectedItem === "reportcard" ? "selected" : ""}`} onClick = {() => handleItemClick('reportcard')}>
          <img src={reportcard} alt="Settings icon" />
          {isSidebarOpen && <span>Report Card</span>}
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
