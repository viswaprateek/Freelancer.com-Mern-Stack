import React, { useState, useEffect, useRef } from 'react';
import { Paper, TextField, Button, Grid, Box, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { getChatMessages, sendChatMessage } from '../api';
import { useAuth } from '../AuthContext';

const ChatComponent = ({ jobId, bidId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [attachmentPreview, setAttachmentPreview] = useState(null);
  const messagesEndRef = useRef(null);
  const { userRole } = useAuth();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const chatMessages = await getChatMessages(jobId);
        setMessages(chatMessages.filter(msg => msg.content != null));
        scrollToBottom();
      } catch (error) {
        console.error('Error fetching chat messages:', error);
      }
    };

    fetchMessages();
  }, [jobId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() && !attachment) return;
    const messageData = {
      text: newMessage,
      bidId: bidId,
      jobId: jobId,
      media: attachment,
      senderRole: userRole
    };

    try {
      const sentMessage = { ...messageData, date: new Date().toISOString() };
      await sendChatMessage(messageData);
      setMessages([...messages, sentMessage]);
      setNewMessage('');
      setAttachment(null);
      setAttachmentPreview(null);
      scrollToBottom();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleUploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 's7cf8bgq'); // Replace with your Cloudinary preset

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dhcc6kt1u/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading file to Cloudinary:', error);
    }
  };

  const handleAttachmentChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const uploadedUrl = await handleUploadToCloudinary(file);
      setAttachment(uploadedUrl);
      setAttachmentPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveAttachment = () => {
    setAttachment(null);
    setAttachmentPreview(null);
    URL.revokeObjectURL(attachmentPreview);
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, maxHeight: 500, overflowY: 'auto' }}>
      <Box sx={{ marginBottom: 2 }}>
        {messages.map((message, index) => (
          <Box key={index} sx={{ marginTop: 1, padding: 1 }}>
            <span><strong>{message.senderRole}</strong> ({new Date(message.date).toLocaleString()}): </span>
            {message.content}
            {message.media && <img src={message.media} alt="Attachment" style={{ maxWidth: '100px', maxHeight: '100px', display: 'block', margin: '10px 0' }} />}
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      {attachmentPreview && (
        <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ marginTop: 2 }}>
          <img src={attachmentPreview} alt="Attachment" style={{ maxWidth: '100px', maxHeight: '100px' }} />
          <IconButton onClick={handleRemoveAttachment}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      <Grid container spacing={2} alignItems="flex-end">
        <Grid item xs={9}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
        </Grid>
        {/* <Grid item xs={1}>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            id="attachment"
            onChange={handleAttachmentChange}
          />
          <label htmlFor="attachment">
            <Button variant="contained" component="span">
              Attach Image
            </Button>
          </label>
        </Grid> */}
        <Grid item xs={2}>
          <Button variant="contained" color="primary" endIcon={<SendIcon />} onClick={handleSendMessage}>
            Send
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ChatComponent;
