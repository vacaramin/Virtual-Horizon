// Classes.js
import React, { useState, useEffect } from "react";
import "./Classes.css";
import QuizForm from "./QuizForm"; // Import QuizForm component

function Classes() {
  const [subjects, setSubjects] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showQuizForm, setShowQuizForm] = useState(false); // New state for controlling visibility
  const [quizzes, setQuizzes] = useState([]);

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
    setShowQuizForm(false); // Hide the quiz form when a class is selected
  };

  const handleBackToClasses = () => {
    setSelectedClass(null);
    setShowQuizForm(false); // Hide the quiz form when going back to classes
  };

  const handleAddQuizClick = () => {
    setShowQuizForm(true); // Show the quiz form when the text is clicked
  };

  const handleQuizSave = (quizData) => {
    // Save the quiz data to the state
    setQuizzes([...quizzes, quizData]);
    setShowQuizForm(false); // Hide the quiz form after saving
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
            <li>
              {/* Conditionally render QuizForm based on the showQuizForm state */}
              {showQuizForm && <QuizForm onSave={handleQuizSave} />}
              {!showQuizForm && (
                <p  onClick={handleAddQuizClick}>
                  Add Quiz
                </p>
              )}
            </li>
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
                  <div>
                    <p className="tutor-name">Awais Mohammad</p>
                    <p className="tutor-description">Experienced tutor with a passion for teaching.</p>
                  </div>
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
