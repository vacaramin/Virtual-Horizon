import { useState } from "react";
import React from "react";
import ChatCSS from "./Chat.module.css";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState(null);

  const handleSendMessage = () => {
    if (newMessage || file) {
      const message = {
        text: newMessage,
        file: file,
        sender: {
          username: "User1", // Replace with the sender's username or identifier
          profilePic: "https://avatars.githubusercontent.com/u/94608299?v=4", // Replace with the URL of the sender's profile picture
          
          
        },
        receiver: {
          username: "User2", // Replace with the receiver's username or identifier
          profilePic: "https://avatars.githubusercontent.com/u/94608299?v=4", // Replace with the URL of the receiver's profile picture
        },
        timestamp: new Date().toLocaleString(),
      };

      setMessages([...messages, message]);
      setNewMessage("");
      setFile(null);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  return (
    <div>
      <h2>Messaging Inbox</h2>

      <div className={ChatCSS.messageContainer}>
        {messages.map((message, index) => (
          <div key={index} className={message.sender.username === "User1" ? "sent" : "received"}>
            <img
              src={message.sender.profilePic}
              alt={message.sender.username}
              className={ChatCSS.profilePic}
            />
            <div>
              <p>{message.text}</p>
              {message.file && (
                <a href={URL.createObjectURL(message.file)} target="_blank" rel="noopener noreferrer">
                  View File
                </a>
              )}
              <p className={ChatCSS.timestamp}>{message.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={ChatCSS.messageInput}>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
