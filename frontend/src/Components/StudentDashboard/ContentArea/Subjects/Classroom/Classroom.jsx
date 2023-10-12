import React from "react";

function Classroom(props) {

  return (
    
    <div className={props.className}>
      <h1>{props.name}</h1>
      <p>{props.content}</p>
    </div>

  );
}

export default Classroom;
