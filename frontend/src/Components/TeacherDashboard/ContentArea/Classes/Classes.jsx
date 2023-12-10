import React, { useState, useEffect } from "react";
import "./Classes.css";

function Classes() {
  const [subjects, setSubjects] = useState([]);
  const Subject = async () => {
    const response = await fetch(
      "http://localhost:4000/courses/getTutorCourses",
      {
        method: "POST",
        credentials: "include",
      }
    );
    const data = await response.json();
    if (data.status === "success") {
      setSubjects(data.links);
    }
  };

  useEffect(() => {
    Subject();
  }, []);

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
          {subjects.map((course) => (
            <li
              key={course.id} // Add a unique key to each element in the array
              className="class-item"
              onClick={() => handleClassSelection(course.name)}
            >
              <span>{course.name}</span>
              <span>{course.description}</span>
            </li>
          ))}
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
