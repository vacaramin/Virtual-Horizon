import React from "react";
import "./ContentArea.css";
import { useState } from "react";
import Settings from "./Settings/Settings";
import Home from "./Home/Home";
import Tutor from "./Tutor/Tutor";
import LanguageSupport from "./LanguageSupport/LanguageSupport";
import Payment from "./Payment/Payment";
import Workspace from "./Workspace/Workspace";


function ContentArea({ selectedItem }) {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjectSelected, setSubjectSelected] = useState(false);

  const subjects = [
    { name: "Math", color: "#FF5B5B", content: "Math Content" },
    { name: "Science", color: "#3EC1D3", content: "Science Content" },
    { name: "History", color: "#FFC870", content: "History Content" },
    { name: "Art", color: "#C5C3FF", content: "Art Content" },
    { name: "Music", color: "#FF94C2", content: "Music Content" },
    { name: "Physical Education", color: "#A5D296", content: "PE Content" },
  ];

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    setSubjectSelected(true);
  };

  const handleGoBack = () => {
    setSelectedSubject(null);
    setSubjectSelected(false);
  };

  if (selectedItem === "home") {
    return (
      <div>
      {/* <h1>Welcome to the student dashboard</h1> */}
        
      <div className="content-area-student">
        <Home />
      </div>
      </div>
    );
  } else if (selectedItem === "subjects") {
    if (subjectSelected && selectedSubject) {
      return (
        <div className="content-area-student">
          <h1>{selectedSubject.name}</h1>
          <p>{selectedSubject.content}</p>
          <button onClick={handleGoBack}>Go Back</button>
        </div>
      );

      //language support
    } else if(selectedItem === "languagesupport"){

      return (
        <div>
          <h1>Language Support</h1>
          <div className="content-area-student">
            <LanguageSupport />
          </div>
        </div>
      );

      //payment area
    } else if(selectedItem === "payment1"){
      return (
        <div>
          <h1>Payment</h1>
          <div className="content-area-student">
            <Payment />
          </div>
        </div>
      );

      //my workspace
    } else if(selectedItem === "workspace"){
      return (
        <div>
          <h1>Workspace</h1>
          <div className="content-area-student">
            <Workspace />
          </div>
        </div>
      );
    }
    else {
      return (
        <div>
         <h1>Subjects</h1>
         
        <div>
          <div className="content-area-student">
            <div className="subject-container">
              {subjects.map((subject) => (
                <span
                  onClick={() => handleSubjectClick(subject)}
                  key={subject.name}
                  className="subject-item"
                  style={{ backgroundColor: subject.color }}
                >
                  {subject.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        </div>
      );
    }
  } else if (selectedItem === "tutor") {
    return (
      <div>
        
      <div className="content-area-student">
        <Tutor/>
        
      </div>
      </div>
    );
  } else if (selectedItem === "settings") {
    return (
      <div>
        <h1>Settings</h1>
        <div className="content-area-student">
          <Settings />
        </div>
      </div>
    );
  } else {
    return (
      <div className="content-area-student">
        <h1>Welcome to the student dashboard</h1>
        <p>Default *** Work Under Progress...</p>
        <img
          style={{ width: "300px" }}
          src="https://static.vecteezy.com/system/resources/previews/002/315/143/original/under-construction-symbol-sign-free-vector.jpg"
          alt="s"
        />
      </div>
    );
  }
}

export default ContentArea;
