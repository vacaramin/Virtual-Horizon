import React, { useState } from "react";
import "./Classes.css";

function Classes() {
  const [selectedClass, setSelectedClass] = useState(null);

  const handleClassSelection = (className) => {
    setSelectedClass(className);
  };

  const handleBackToClasses = () => {
    setSelectedClass(null);
  };

  // Render class selection
  if (!selectedClass) {
    return (
      <div className="classes-container">
        <h1>Classes</h1>
        <ul className="class-list">
          <li className="class-item" onClick={() => handleClassSelection("Math")}>
            <span>Math</span>
            <span>Grade 10</span>
          </li>
          <li className="class-item" onClick={() => handleClassSelection("English")}>
            <span>English</span>
            <span>Grade 9</span>
          </li>
          <li className="class-item" onClick={() => handleClassSelection("Science")}>
            <span>Science</span>
            <span>Grade 8</span>
          </li>
          {/* Add more classes here */}
        </ul>
      </div>
    );
  }

  // Render submenu for selected class
  return (
    <div className="classes-container">
      
      <h2>{selectedClass}</h2>
      <ul className="submenu-list">
        <li>Add Assignment</li>
        <li>Grade Assignment</li>
        <li>Add Quiz</li>
        <li>Grade Quiz</li>
        <li>Start Classroom</li>
        <li>Class Chat</li>
        {/* Add more submenu options here */}
      </ul>
      <button className="back-button" onClick={handleBackToClasses}>
        Back to Classes
      </button>
    </div>
  );
}

export default Classes;