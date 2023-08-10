import React, { useState, useEffect } from "react";
import "./Settings.css";
import Container from "./Container/Container";
import { List, ListItem, ListItemText } from '@mui/material';


function Settings() {
  const [editing, setEditing] = useState(false);
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Admin' },
  ];
  useEffect(() => {
    fetch("http://localhost:4000/GetProfileByID/5")
      .then(response => response.json())
      .then(data => {
        setUser(data.user);
        console.log(data.user);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, []);


  // const handleLogin_Teacher = () => {
  //   const payload = { email, password };
  //   fetch("http://localhost:4000/GetProfileByID/5", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(payload),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       //if responsce is ok
  //       if (data.status === "success") {
  //         console.log("Login Successful");
  //         //strong the recieving token in data to local browser cookies
  //         localStorage.setItem("token", data.token);
  //         localStorage.setItem("username", data.username);
          
  //         //setting cookie authorization token
  //         document.cookie = `authorization=${data.token}`;
  //         document.cookie = `username=${data.username}`;
  //         //redirect to home page
  //         history("/home-teacher");

  //         //redirect to home page
  //       }
  //       if (data.status === "failed") {
  //         console.log("Login Failed");
          
  //         console.log(data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    
      
    <Container>

    <List>
      {data.map((item) => (
        <ListItem key={item.name}>
          <ListItemText primary={item.email} secondary={item.role} />
        </ListItem>
      ))}
    </List>
    </Container>
  );
}

export default Settings;
