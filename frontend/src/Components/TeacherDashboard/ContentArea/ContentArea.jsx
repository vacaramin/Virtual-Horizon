import React from "react";
import "./ContentArea.css";
import Home from "./Home/Home";
import Settings from "./Settings/Settings";
import Notifications from "./Notifications/Notifications";
import Wallet from "./Wallet/Wallet";
import Classes from "./Classes/Classes";
function ContentArea({ selectedItem }) {
  if (selectedItem === "home") {
    return (
      <div className="content-area">
        
        <Home />
      </div>
    );
  } else if (selectedItem === "classes") {
    return (
      <div className="content-area">
        <Classes/>
      </div>
    );
  } else if (selectedItem === "notifications") {
    return (
      <div>
        <div className="content-area">
          <Notifications/>
        </div>
      </div>
    );
  } else if (selectedItem === "wallet") {
    return (
      <div>
        <div className="content-area">
          <Wallet/>
        </div>
      </div>
    );
  } else if (selectedItem === "settings") {
    return (
      <div>
        <h1>Settings</h1>
        <div className="content-area">
          <Settings/>
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
