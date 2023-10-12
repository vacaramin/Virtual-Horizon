import React, { useState} from 'react';
import { TextField, Button, Stack } from '@mui/material';
import styles from './VhAssistant.module.css';
import vhAssistantImage from './vhassistant.svg';
const userImage = 'https://avatars.githubusercontent.com/u/68877880?v=4';

function VhAssistant() {
  const [firstmessage, setFirstMessage] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  
  const handleSendQuery = () => {
    setFirstMessage(true);
    const newConversation = [
      ...conversation,
      { type: 'user', text: userMessage },
      { type: 'assistant', text: 'Response will be shown here...' }, // Placeholder for actual response
    ];
    setConversation(newConversation);
    setUserMessage('');
  }
  return (
    <div className={styles.vhAssistant}>
      <img src={vhAssistantImage} className = {styles.center}alt="vhAssistant" />
      <div className={styles.topbar}>
        Welcome to the Virtual Horizon Assistant. The VH Assistant is an AI based chatbot helping you in asking different sort of questions in order to resolve your queries.
      </div>

      {firstmessage ? (
        <div className={styles.messageContainer}>
          {conversation.map((message, index) => (
            <div key={index} className={`${styles.message} ${message.type}`}>
              <img
                src={message.type === 'user' ? userImage : vhAssistantImage}
                alt={message.type}
                className={styles.profilePic}
              />
              <div className={styles.messageContent}>
                <p>{message.text}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        ''
      )}
      <div className={styles.messageInput}>
        <TextField
          id="Input"
          type="text"
          label="Ask VH Assistant..."
          multiline
          fullWidth
          variant="outlined"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        />
        <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={handleSendQuery} style={{ backgroundColor: '#243047' }}>
            Send Query
          </Button>
        </Stack>
      </div>
    </div>
  );
}

export default VhAssistant;
