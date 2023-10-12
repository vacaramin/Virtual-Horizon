import React from "react";
import styles from "./ClassroomFeatures.module.css";

function ClassroomFeatures(props) {

  
  const handleQuizzes = () => {
    props.setSelectedFeature("Quizzes");
  };

  const handleChat = () => {
    props.setSelectedFeature("Chat");
  };

  const handleVideoMeeting = () => {
    props.setSelectedFeature("VideoMeeting");
  };

  return (
    <div className={props.className}>
      <h2>Dashboard</h2>
      <button
        className={styles.longButton}
        style={{ backgroundColor: "#243047", width: "100%", marginRight: "20%" }}
        onClick={handleVideoMeeting}
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

    </div>
  );
}

export default ClassroomFeatures;
