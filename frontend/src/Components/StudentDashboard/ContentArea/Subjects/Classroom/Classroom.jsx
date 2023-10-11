import styles from "./Classroom.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Classroom(props){

    const [selectedSubject, setSelectedSubject] = useState(null);
    const [subjectSelected, setSubjectSelected] = useState(false);

    const handleGoBack = () => {
        setSelectedSubject(null);   
        setSubjectSelected(false);
      };
  

return (

    <div>
    <h1>{props.name}</h1>
    <p>{props.content}</p>
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
            <p>Awais Mohammad: Hello sir!!</p>
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
        <h2>Dashboard</h2>
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
}

export default Classroom;