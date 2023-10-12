import styles from "./Classroom.module.css";
import React, { useState, useEffect } from "react";

function Classroom(props) {

  return (
    
    <div className={props.className}>
      <h1>{props.name}</h1>
      <p>{props.content}</p>
    </div>

  );
}

export default Classroom;
