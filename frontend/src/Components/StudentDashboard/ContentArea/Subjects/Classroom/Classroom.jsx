import styles from "./Classroom.module.css";
import React, { useState, useEffect } from "react";

function Classroom(props) {
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
      <button style={{ backgroundColor: "#243047" }} onClick={handleGoBack}>
        {" "}
        Go Back
      </button>

      
    </div>
  );
}

export default Classroom;
