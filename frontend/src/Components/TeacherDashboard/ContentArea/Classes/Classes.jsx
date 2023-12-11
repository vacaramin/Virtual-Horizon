// JSX
import React, { useState, useEffect } from "react";
import "./Classes.css";

function Classes() {
  const [subjects, setSubjects] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

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

  const handleClassSelection = (className) => {
    setSelectedClass(className);
  };

  const handleBackToClasses = () => {
    setSelectedClass(null);
  };

  return (
    <div className="classes-container">
      {selectedClass ? (
        // Render submenu for selected class
        <div>
          <h2>{selectedClass}</h2>
          <ul className="submenu-list">
            <li>Add Assignment</li>
            <li>Grade Assignment</li>
            <li>Add Quiz</li>
            <li>Start Classroom</li>
            <li>Class Chat</li>
            {/* Add more submenu options here */}
          </ul>
          <button className="back-button" onClick={handleBackToClasses}>
            Back to Classes
          </button>
        </div>
      ) : (
        // Render class selection with cards
        <>
          <h1>Classes</h1>
          <div className="card-container">
            {subjects.map((course) => (
              <div
                key={course.id}
                className="class-card"
                onClick={() => handleClassSelection(course.name)}
              >
                <h3>{course.name}</h3>
                {/* Fetch tutor information and display it */}
                <div className="tutor-info">
                  <img
                    src="https://avatars.githubusercontent.com/u/94608299?v=4"
                    alt={`${course.tutorName}'s profile`}
                    className="profile-picture"
                  />
                  <p className="tutor-name">Awais Mohammad</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Classes;
