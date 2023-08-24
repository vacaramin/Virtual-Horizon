import React, { useState, useEffect } from "react";
import "./Settings.css";
import Container from "./Container/Container";
import { List, ListItem, ListItemText } from "@mui/material";

function Settings() {
  //const [editing, setEditing] = useState(false);
  const [user, setUser] = useState({});
  console.log(document.cookie)
  useEffect(() => {
    fetch("http://localhost:4000/GetProfileByID/5", {method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  })
      .then(response => response.json())
      .then(data => {
        setUser(data.user);
        console.log(data.user);
        setUser(data.user)
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <Container>
      <List>
        <ListItem>
          <ListItemText primary={`Name: ${user.Name}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Email: ${user.Email}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Date of Birth: ${user.Dob}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Gender: ${user.Gender}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Parent/Guardian Name: ${user.ParentGuardianName}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Parent/Guardian Email: ${user.ParentGuardianEmail}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Parent/Guardian Phone: ${user.ParentGuardianPhone}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Grade Level: ${user.GradeLevel}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Current School: ${user.CurrentSchool}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Device: ${user.Device}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Internet Connection: ${user.InternetConnection}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Special Needs: ${user.SpecialNeeds}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Accommodations: ${user.Accommodations}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Present Address: ${user.PresentAddress}`} />
        </ListItem>
      </List>
    </Container>
  );
}

export default Settings;
