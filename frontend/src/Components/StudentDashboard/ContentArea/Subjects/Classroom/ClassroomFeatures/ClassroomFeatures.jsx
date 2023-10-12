import React from "react";
import styles from "./ClassroomFeatures.module.css";

function ClassroomFeatures(props) {

  const handleVideoConferencing = () => {
    props.setSelectedFeature("Video Conferencing");
  };

  const handleQuizzes = () => {
    props.setSelectedFeature("Quizzes");
  };

  const handleChat = () => {
    props.setSelectedFeature("Chat");
  };

  return (
    <div className={props.className}>
      <h2>Dashboard</h2>
      <button
        className={styles.longButton}
        style={{ backgroundColor: "#243047", width: "100%", marginRight: "20%" }}
        onClick={handleVideoConferencing}
      >
        <i className="fa fa-video-camera" aria-hidden="true"></i> Video Conferencing
      </button>
      <button
        className={styles.longButton}
        style={{ backgroundColor: "#243047", width: "100%", marginRight: "20%" }}
        onClick={handleQuizzes}
      >
        <i className="fa fa-question-circle" aria-hidden="true"></i> Quizzes
      </button>
      <button
        className={styles.longButton}
        style={{ backgroundColor: "#243047", width: "100%", marginRight: "20%" }}
        onClick={handleChat}
      >
        <i className="fa fa-comments" aria-hidden="true"></i> Chat
      </button>

      {/* Render the selected subject component 
      {subjectSelected && (
        <div>
          {selectedSubject === "Video Conferencing" && <VideoMeeting />}
          {selectedSubject === "Quizzes" && <Quizzes />}
          {selectedSubject === "Chat" && <Chat />}
        </div>
      )}*/}
    </div>
  );
}

export default ClassroomFeatures;
