import styles from "./Classroom.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Quizzes from "./Quizzess/Quizzes";
import Chat from "./Chat/Chat";
import VideoMeeting from "./Video meeting/VideoMeeting";

function Classroom(props) {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjectSelected, setSubjectSelected] = useState(false);

  const handleGoBack = () => {
    setSelectedSubject(null);
    setSubjectSelected(false);
  };
  const handleVideoConferencing = () => {
    setSelectedSubject("Video Conferencing");
    setSubjectSelected(true);
  };

  const handleQuizzes = () => {
    setSelectedSubject("Quizzes");
    setSubjectSelected(true);
  };

  const handleChat = () => {
    setSelectedSubject("Chat");
    setSubjectSelected(true);
  };

  return (
    <div>
      <h1>{props.name}</h1>
      <p>{props.content}</p>
      <button style={{ backgroundColor: "#243047" }} onClick={handleGoBack}>
        {" "}
        Go Back
      </button>

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
            style={{
              backgroundColor: "#243047",
              width: "100%",
              marginRight: "20%",
            }}
            onClick={handleVideoConferencing}
          >
            <i className="fa fa-video-camera" aria-hidden="true"></i> Video
            Conferencing
          </button>
          <button
            className={styles.longButton}
            style={{
              backgroundColor: "#243047",
              width: "100%",
              marginRight: "20%",
            }}
            onClick={handleQuizzes}
          >
            <i className="fa fa-question-circle" aria-hidden="true"></i> Quizzes
          </button>
          <button
            className={styles.longButton}
            style={{
              backgroundColor: "#243047",
              width: "100%",
              marginRight: "20%",
            }}
            onClick={handleChat}
          >
            <i className="fa fa-comments" aria-hidden="true"></i> Chat
          </button>
          {/* Render the selected subject component */}
          {subjectSelected && (
            <div>
              {selectedSubject === "Video Conferencing" && <VideoMeeting />}
              {selectedSubject === "Quizzes" && <Quizzes />}
              {selectedSubject === "Chat" && <Chat />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Classroom;
