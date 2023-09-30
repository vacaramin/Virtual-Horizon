import React from "react";
import "./ContentArea.css";
import Settings from "./Settings/Settings";
import Home from "./Home/Home";
import Tutor from "./Tutor/Tutor";
import VhAssistant from "./VhAssistant/VhAssistant";
import Payment from "./Payment/Payment";
import Subjects from "./Subjects/Subjects";

function ContentArea({ selectedItem }) {

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
    return (
      <div>
        <h1>Subjects</h1>
        <div className="content-area-student">
          <Subjects />
        </div>
      </div>
    );
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
