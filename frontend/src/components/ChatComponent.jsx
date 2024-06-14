// ChatComponent.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMessagesByContract, postMessage } from '../api';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useAuth } from '../AuthContext'; // Ensure you have this hook

const ChatComponent = () => {
    const { contractId } = useParams();
    const { userId } = useAuth(); // Make sure this is the actual ObjectId from the logged-in user
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        fetchMessages();
    }, [contractId]);

    const fetchMessages = async () => {
        try {
            const fetchedMessages = await getMessagesByContract(contractId);
            setMessages(fetchedMessages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;
        try {
            const messageData = {
                contractId,
                fromUser: userId, // Ensure this is a valid ObjectId
                text: newMessage
            };
            const sentMessage = await postMessage(messageData);
            setMessages([...messages, sentMessage]);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <Box>
            <Typography variant="h6">Chat</Typography>
            <div style={{ maxHeight: '300px', overflowY: 'scroll' }}>
                {messages.map((msg, index) => (
                    <Typography key={index}>{msg.fromUser.username}: {msg.message}</Typography>
                ))}
            </div>
            <TextField
                fullWidth
                variant="outlined"
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <Button onClick={handleSendMessage}>Send</Button>
        </Box>
    );
};

export default ChatComponent;
