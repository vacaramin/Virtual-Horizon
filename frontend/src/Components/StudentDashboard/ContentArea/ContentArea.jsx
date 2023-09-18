import React from "react";
import "./ContentArea.css";
import { useState } from "react";
import Settings from "./Settings/Settings";
import Home from "./Home/Home";
import Tutor from "./Tutor/Tutor";
import VhAssistant from "./VhAssistant/VhAssistant";
import Payment from "./Payment/Payment";
import MyPic from "./Home/MyPic.svg";

function ContentArea({ selectedItem }) {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjectSelected, setSubjectSelected] = useState(false);

  const subjects = [
    {
      name: "Math",
      color: "#FF5B5B",
      content: "Math Content",
      teacher: {
        name: "John Doe",
        profilePic: MyPic,
      },
    },
    {
      name: "Science",
      color: "#3EC1D3",
      content: "Science Content",
      teacher: {
        name: "Jane Smith",
        profilePic: MyPic,
      },
    },
    {
      name: "English",
      color: "#FFC93C",
      content: "English Content",
      teacher: {
        name: "John Doe",
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

  if (selectedItem === "home") {
    return (
      <div>
        {/* <h1>Welcome to the student dashboard</h1> */}
        <div className="content-area-student">
          <Home />
        </div>
      </div>
    );
  } else if (selectedItem === "payment") {
    return (
      <div>
        <h1>Payment</h1>
        <div className="content-area-student">
          <Payment />
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
    } else {
      return (
        <div>
          <h1>Subjects</h1>
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
                      <p>{subject.name}</p> {/* Display subject name at the bottom center */}
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
  } else if (selectedItem === "vhassistant") {
    return (
      <div>
        <h1>Welcome to the VH Assistant</h1>
        <div className="content-area-student">
          <VhAssistant />
        </div>
      </div>
    );
  } else if (selectedItem === "tutor") {
    return (
      <div>
        <h1>Hire Tutors</h1>
        <div className="content-area-student">
          <Tutor />
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
