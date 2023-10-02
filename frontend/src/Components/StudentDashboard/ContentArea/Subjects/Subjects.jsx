import React, { useState, useEffect } from "react";
import MyPic from "../Home/MyPic.svg";
import "./Subjects.css";
import axios from "axios";

function Subjects() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjectSelected, setSubjectSelected] = useState(false);
  const [studentSubjects, setStudentSubjects] = useState({});

  const getStudentCourses = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/courses/getStudentCourses",
        {
          // Add your request data here if needed
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json", // Adjust content type as needed
            // Add any other headers you need here
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const subjectsData = await getStudentCourses();
        setStudentSubjects(subjectsData);
        console.log(subjectsData); // Log the data after updating the state
      } catch (error) {
        console.error("Error:", error);
      }
    })();
  }, []);

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    setSubjectSelected(true);
  };

  const handleGoBack = () => {
    setSelectedSubject(null);
    setSubjectSelected(false);
  };

  if (subjectSelected && selectedSubject) {
    return (
      <div className="content-area-student">
        <h1>{selectedSubject.name}</h1>
        <p>{selectedSubject.content}</p>
        <button onClick={handleGoBack}>Go Back</button>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <div className="content-area-student">
            <div className="subject-container">
              {studentSubjects.Courses &&
                studentSubjects.Courses.map((course) => (
                  <div
                    key={course.id}
                    className="subject-card"
                    style={{
                      backgroundColor: "#FF5B5B", // Set a default color if needed
                      width: "25%",
                      height: "200px",
                    }}
                  >
                    <div className="subject-card-content">
                      <p classname = "course-name">{course.name}</p>
                      <p classname = "course-description">{course.description}</p>
                      </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Subjects;
