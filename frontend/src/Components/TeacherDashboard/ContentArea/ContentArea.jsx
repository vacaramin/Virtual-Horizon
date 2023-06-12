import React from "react";
import "./ContentArea.css";
function ContentArea({ selectedItem }) {
  if (selectedItem === "home") {
    return (
      <div className="content-area">
        <h1>Home</h1>
        <p>Work Under Progress...</p>
      </div>
    );
  } else if (selectedItem === "classes") {
    return (
      <div className="content-area">
        <h1>Classes</h1>
        <p>Work Under Progress...</p>
      </div>
    );
  } else if (selectedItem === "notifications") {
    return (
      <div>
        <h1>Notifications</h1>
        <div className="content-area">
          <p>Work Under Progress...</p>
        </div>
      </div>
    );
  } else if (selectedItem === "wallet") {
    return (
      <div>
        <h1>Wallet</h1>
        <div className="content-area">
          <p>Work Under Progress...</p>
        </div>
      </div>
    );
  } else if (selectedItem === "settings") {
    return (
      <div>
        <h1>Settings</h1>
        <div className="content-area">
          <p>Work Under Progress...</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="content-area">
        <h1>Failure</h1>
        <p>Work Under Progress...</p>
      </div>
    );
  }
}

export default ContentArea;
