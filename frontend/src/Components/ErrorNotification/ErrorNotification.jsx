import React, { useState, useEffect } from "react";
import './ErrorNotification.css';
function ErrorNotification({ error }) {
    const [showError, setShowError] = useState(false);
  
    useEffect(() => {
      let timeout;
  
      if (error) {
        setShowError(true);
  
        timeout = setTimeout(() => {
          setShowError(false);
        }, 5000);
      } else {
        setShowError(false);
      }
  
      return () => clearTimeout(timeout);
    }, [error]);
  
    if (!showError) {
      return null;
    }
  
    return (
      <div className="error-notification">
        <span className="error-text">{error}</span>
        <span className="close-icon" onClick={() => setShowError(false)}>
          &times;
        </span>
      </div>
    );
  }
  
  export default ErrorNotification;
  