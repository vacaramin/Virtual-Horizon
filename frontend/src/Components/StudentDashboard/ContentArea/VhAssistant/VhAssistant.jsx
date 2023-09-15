import * as React from 'react';
import { TextField } from "@mui/material";
import './VhAssistant.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import vhAssistant from "/home/awais/Desktop/Virtual-Horizon/frontend/src/Components/StudentDashboard/Sidebar/Logo of Student Dashboard/vhassistant.svg";

function VhAssistant() {

  const autoGeneratedText = "Response will be shown here.";


  return (
  
    <div>

      <div>Welcome to the Virtual Horizon Assistant. The VH Assistant is an AI based chatbot helping you in asking different sort of questions in order to resolve your queries.</div>
      <img src= {vhAssistant} alt="VH Assistant" className="center" />
      
      <TextField
         
            id="Input"
            type="text"
            label="Ask VH Assistant..."
            multiline
            style={{ marginTop: "2%", marginLeft: "15%", marginRight: "15%" , width: "70%", maxWidth: "100%"}}
            halfWidth
      />  

          <Stack spacing={2} direction="row" style={{ marginLeft: "15%"}}>
            <Button variant="contained" endIcon={<sendIcon/>} style={{ marginTop: "2%", backgroundColor: "#243047", marginRight: "75%" }}>
             Send Query
           </Button>
          </Stack>


          <TextField 
      
            id="Response"
            label="Response"
            multiline
            value={autoGeneratedText}
            InputProps={{readOnly: true, }}
            style={{ marginLeft: "10%", marginTop: "3%" ,width: "80%", marginRight: "10%", maxWidth: "100%"}}
           
         />
          

      </div>

    
  );
}

export default VhAssistant;
