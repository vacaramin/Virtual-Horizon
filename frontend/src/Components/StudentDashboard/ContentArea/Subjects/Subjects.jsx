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


  //Selected subject it will include the students activity, tasks, quizzes, video conferencing, etc.
  if (subjectSelected && selectedSubject) {
    return (
      <div className={styles.contentAreaStudent}>
      <h1>{selectedSubject.name}</h1>
      <p>{selectedSubject.content}</p>
      <button style={{ backgroundColor: "#243047"  }} onClick={handleGoBack}> Go Back</button>

      <div className={styles.activitySection}>
        {/* Activity and Comment Section */}
        <div className={styles.activityContainer}>
          {/* Activity Feed */}
          <div className={styles.activityFeed}>
            {/* Activity items go here */}
            <div className={styles.activityItem}>
              {/* Activity item content */}
              <p>Activity 1: Any activity that will be done.</p>
            </div>
            {/* Add more activity items as needed */}
          </div>

          {/* Comment Section */}
          <div className={styles.commentSection}>
            {/* Comments go here */}
            <div className={styles.comment}>
              {/* Comment content */}
              <p>User 1: Comment 1</p>
            </div>
            {/* Add more comments as needed */}
          </div>

          {/* Add Comment Form */}
          <form className={styles.commentForm}>
            <input
              type="text"
              placeholder="Add a comment..."
              className={styles.commentInput}
            />
            <button type="submit" className={styles.commentSubmit}>
              <i className="fa fa-paper-plane" aria-hidden="true"></i> Send
            </button>
          </form>
        </div>

        {/* Vertical Bar with Long Buttons */}
        <div className={styles.verticalBar}>
          <button
            className={styles.longButton}
            style={{ backgroundColor: "#243047", width: "100%" , marginRight: "20%" }}
          >
            <i className="fa fa-video-camera" aria-hidden="true"></i> Video Conferencing
          </button>
          <button
            className={styles.longButton}
            style={{ backgroundColor: "#243047" , width: "100%", marginRight: "20%" }}
          >
            <i className="fa fa-question-circle" aria-hidden="true"></i> Quizzes
          </button>
          <button
            className={styles.longButton}
            style={{ backgroundColor: "#243047", width: "100%" , marginRight: "20%"  }}
          >
            <i className="fa fa-tasks" aria-hidden="true"></i> Class Tasks
          </button>
        </div>
      </div>
    
      {/* Message Box at Bottom Right */}
      <div className={styles.messageBox}>
        <h2>Private Message</h2>
        <textarea placeholder="Type your message..."></textarea>
        <button
          style={{
            backgroundColor: "#243047",
            color: "#fff",
            padding: "10px 30px",
          }}
        >
          Send
          <i className="fa fa-paper-plane" aria-hidden="true"></i>
        </button>
      </div>
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