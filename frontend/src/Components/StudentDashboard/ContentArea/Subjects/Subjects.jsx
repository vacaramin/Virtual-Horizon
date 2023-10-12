import React, { useState, useEffect } from "react";
import styles from "./Subjects.module.css";
import axios from "axios";
import Classroom from "./Classroom/Classroom";
import LoadingOverlay from "../../../LoadingOverlay/LoadingOverlay";
import ClassroomFeatures from "./Classroom/ClassroomFeatures/ClassroomFeatures";

function Subjects() {
  const [isPending, setIsPending] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjectSelected, setSubjectSelected] = useState(false);
  const [studentSubjects, setStudentSubjects] = useState({});
  const [selectedFeature, setSelectedFeature] = useState("");

  const handleGoBack = () => {
    setSelectedSubject(null);
    setSubjectSelected(false);
  };
  const getStudentCourses = async () => {
    try {
      setIsPending(true);
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
      setIsPending(false);

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
    setSelectedFeature(""); // Reset selected feature when a new subject is selected
  };
  //Selected subject it will include the students activity, tasks, quizzes, video conferencing, etc.
  if (subjectSelected) {
    return (
      <div>
        <div className={styles.ContainerSubject}>
          <button style={styles.BackButton} onClick={handleGoBack}>
            {" "}
            Go Back
          </button>

          <Classroom
            name={selectedSubject.name}
            content="temps"
            className={styles.ClassroomSubjected}
          ></Classroom>
          <ClassroomFeatures
            className={styles.ClassroomFeatures}
            selectedFeature={selectedFeature}
            setSelectedFeature={setSelectedFeature} // Pass setSelectedFeature function
          />
        </div>
        <div className={styles.ContainerSubject}></div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Subjects</h1>
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
                        backgroundImage: `url(${course.backgroundImage})`, // Add background image URL here
                        backgroundSize: "cover", // Optional: Adjust background size as needed
                        backgroundPosition: "center", // Optional: Adjust background position as needed
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
                        <div className={styles.tutorName}>Awais Mohammad</div>
                      </div>
                      <br />
                      <br />
                      <p className={styles.courseName}>{course.name}</p>
                      <p className={styles.courseDescription}>
                        {course.description}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {isPending && <LoadingOverlay />}
      </div>
    );
  }
}
export default Subjects;
