import React from "react";
import { useState } from "react";
import MyPic from "../Home/MyPic.svg";
import CSS_Object from "./Subjects.css";

function Subjects() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjectSelected, setSubjectSelected] = useState(false);

  const subjects = [
    {
      name: "Math",
      color: "#FF5B5B",
      content: "Math Content",
      teacher: {
        name: "Awais Mohammad",
        profilePic: MyPic,
      },
    },
    {
      name: "Science",
      color: "#3EC1D3",
      content: "Science Content",
      teacher: {
        name: "Waqar Amin",
        profilePic: MyPic,
      },
    },
    {
      name: "English",
      color: "#FFC93C",
      content: "English Content",
      teacher: {
        name: "Ali Zain",
        profilePic: MyPic,
      },
    },
    // Add more subjects with teacher info here
  ];

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    setSubjectSelected(true);
  };

  const handleGoBack = () => {
    setSelectedSubject(null);
    setSubjectSelected(false);
  };

  if (subjectSelected && selectedSubject) {
    return (
      <div className="content-area-student">
        <h1>{selectedSubject.name}</h1>
        <p>{selectedSubject.content}</p>
        <button onClick={handleGoBack}>Go Back</button>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <div className="content-area-student">
            <div className="subject-container">
              {subjects.map((subject) => (
                <div
                  onClick={() => handleSubjectClick(subject)}
                  key={subject.name}
                  className="subject-card"
                  style={{
                    backgroundColor: subject.color,
                    width: "30%", // Adjust card width in percentage
                    height: "200px", // Adjust card height in pixels
                  }}
                >
                  <div className="subject-card-header">
                    <div className="teacher-profile-pic">
                      <img
                        src={subject.teacher.profilePic}
                        alt={subject.teacher.name}
                      />
                    </div>
                    <div className="subject-header-details">
                      <p>{subject.teacher.name}</p>
                    </div>
                  </div>
                  <div className="subject-card-content">
                    <p>{subject.name}</p>{" "}
                    {/* Display subject name at the bottom center */}
                    <p>{subject.content}</p>
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
