import React from "react";
import './Notifications.css';

const Notifications = () => {

    return (
        <div className="notifications-container">
        <div className="box notifications-box">
            <h1 className="box-title">Notifications</h1>
            <div className="box-content">
            <h3>Notification Details</h3>
            <p>These are the details of the notifications.</p>
            </div>
        </div>
        </div>
    );
}

export default Notifications;