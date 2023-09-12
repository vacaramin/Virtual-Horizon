import React from 'react';
import { TextField } from "@mui/material";
import './VhAssistant.css';

function VhAssistant() {
  return (
    <div>
      <div className="topbar">Welcome to the Virtual Horizon Assistant. The VH Assistant is an AI based chatbot helping you in asking different sort of questions in order to resolve your queries.</div>
      
      <TextField
            id="Input"
            type="text"
            label="Enter your query..."
            style={{ marginTop: "10%", marginLeft: "40%" }}
            halfWidth
            
          />

      </div>

    
  );
}

export default VhAssistant;
