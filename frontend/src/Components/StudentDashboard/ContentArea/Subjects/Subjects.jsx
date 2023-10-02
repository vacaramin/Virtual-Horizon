import React, { useState, useEffect } from "react";
import styles from "./Subjects.module.css";
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
      <div className={styles.contentAreaStudent}>
        <h1>{selectedSubject.name}</h1>
        <p>{selectedSubject.content}</p>
        <button onClick={handleGoBack}>Go Back</button>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <div className={styles.contentAreaStudent}>
            <div className={styles.subjectContainer}>
              {studentSubjects.Courses &&
                studentSubjects.Courses.map((course) => (
                  <div className={styles.subjectCard}>
                    <div
                      key={course.id}
                      style={{
                        border: "1px solid blue",
                        borderRadius: "8px",
                        padding: "10px",
                        cursor: "pointer",
                        position: "relative", // Added position relative for absolute positioning
                      }}
                      className={styles.subjectCardContent}
                      onClick={() => handleSubjectClick(course)} // Added onClick handler
                    >
                      <div
                        className={styles.tutorBanner}
                        style={{ backgroundColor: "#f7cb46" }} 
                      >
                        <img
                          src="https://avatars.githubusercontent.com/u/94608299?v=4" 
                          alt="Tutor Profile"
                          className={styles.profilePicture}
                        />
                        <div className={styles.tutorName}>Awais Muhammad</div>
                      </div>
                      <br /><br />
                      <p className={styles.courseName}>{course.name}</p>
                      <p className={styles.courseDescription}>{course.description}</p>
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