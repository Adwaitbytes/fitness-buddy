import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';

const socket = io('http://localhost:5000');

function Chat() {
  const { userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const room = `${userId}-${localStorage.getItem('userId')}`; // Simplified room ID
    socket.emit('join', room);
    socket.on('message', (msg) => setMessages(prev => [...prev, msg]));
    return () => socket.off('message');
  }, [userId]);

  const sendMessage = () => {
    const room = `${userId}-${localStorage.getItem('userId')}`;
    socket.emit('message', { room, message, user: localStorage.getItem('username') });
    setMessage('');
  };

  return (
    <Container>
      <Typography variant="h4">Chat</Typography>
      <List>
        {messages.map((msg, index) => (
          <ListItem key={index}>
            <ListItemText primary={`${msg.user}: ${msg.message}`} secondary={new Date(msg.timestamp).toLocaleTimeString()} />
          </ListItem>
        ))}
      </List>
      <TextField value={message} onChange={(e) => setMessage(e.target.value)} fullWidth />
      <Button onClick={sendMessage} variant="contained">Send</Button>
    </Container>
  );
}

export default Chat;