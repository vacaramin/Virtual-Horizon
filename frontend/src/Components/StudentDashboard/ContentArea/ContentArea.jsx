import React from "react";
import "./ContentArea.css";
import { useState } from "react";
import Timetable from "../TimeTable/TimeTable";
import ClassLinks from "./ClassLinks/ClassLinks";
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
      <div className="content-area-student">
        <h1>Welcome to the student dashboard</h1>
        <p> Home *** Work Under Progress...</p>
        <img
          style={{ width: "300px" }}
          src="https://static.vecteezy.com/system/resources/previews/002/315/143/original/under-construction-symbol-sign-free-vector.jpg"
          alt="s"
        />
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
      );
    }
  } else if (selectedItem === "timetable") {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const subjects = ["Math", "Science", "History", "Art", "Music"];

    function generateRandomTimetable() {
      const slots = [];
      const times = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"];
      const numSlots = times.length;

      for (let i = 0; i < numSlots; i++) {
        const time = times[i];
        const slotSubjects = [];

        for (let j = 0; j < days.length; j++) {
          const day = days[j];
          const randomSubjectIndex = Math.floor(
            Math.random() * subjects.length
          );
          const subject = subjects[randomSubjectIndex];
          slotSubjects.push({ day, name: subject });
        }

        slots.push({ time, subjects: slotSubjects });
      }

      return slots;
    }

    const timetable = {
      days,
      slots: generateRandomTimetable(),
    };

    return (
      <div>
      <h1>TimeTable</h1>
        
      <div className="content-area-student">
        <Timetable days={days} subjects={subjects} timetable={timetable} />
      </div>
      </div>
    );
  } else if (selectedItem === "tutor") {
    return (
      <div className="content-area-student">
        <h1>Welcome to the student dashboard</h1>
        <p> Tutor *** Work Under Progress...</p>
        <img
          style={{ width: "300px" }}
          src="https://static.vecteezy.com/system/resources/previews/002/315/143/original/under-construction-symbol-sign-free-vector.jpg"
          alt="s"
        />
      </div>
    );
  } else if (selectedItem === "classlinks") {
    const classLinks = [
      { subject: "Math", url: "https://math-class-link.com" },
      { subject: "Science", url: "https://science-class-link.com" },
      { subject: "History", url: "https://history-class-link.com" },
    ];
    return (
      <div>
      <h1>Class Links</h1>
        
      <div className="content-area-student">
        <ClassLinks links = {classLinks}/>
      </div>
      </div>
    );
  } else if (selectedItem === "reportcard") {
    return (
      <div className="content-area-student">
        <h1>Welcome to the student dashboard</h1>
        <p> Report Card *** Work Under Progress...</p>
        <img
          style={{ width: "300px" }}
          src="https://static.vecteezy.com/system/resources/previews/002/315/143/original/under-construction-symbol-sign-free-vector.jpg"
          alt="s"
        />
      </div>
    );
  } else if (selectedItem === "settings") {
    return (
      <div className="content-area-student">
        <h1>Welcome to the student dashboard</h1>
        <p>Settings *** Work Under Progress...</p>
        <img
          style={{ width: "300px" }}
          src="https://static.vecteezy.com/system/resources/previews/002/315/143/original/under-construction-symbol-sign-free-vector.jpg"
          alt="s"
        />
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
