import React, { useState, useEffect } from 'react';
import { TextField, Button, Modal, Box, Typography, Card, CardContent } from '@mui/material';
import { postFeedback, getFeedbackById } from '../api'; // Ensure these are correctly implemented

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};


const Feedback = ({ bidId }) => {
  const [feedback, setFeedback] = useState({ rating: '', feedbackText: '', bidId: bidId });
  const [viewedFeedback, setViewedFeedback] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const existingFeedback = await getFeedbackById(bidId);
        setViewedFeedback(existingFeedback);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedback();
  }, [bidId]);

  const handleChange = (event) => {
    setFeedback({ ...feedback, [event.target.name]: event.target.value });
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const submittedFeedback = await postFeedback(feedback);
      setViewedFeedback(submittedFeedback); // Update the feedback shown on the page
      handleCloseModal();
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpenModal}>
        Add Feedback
      </Button>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6" mb={2}>Submit Feedback</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Rating (1-5)"
              type="number"
              name="rating"
              value={feedback.rating}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Feedback"
              name="feedbackText"
              value={feedback.feedbackText}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
            />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>

      {viewedFeedback && (
        <Card variant="outlined" sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6">Feedback Received</Typography>
            <Typography>Rating: {viewedFeedback.rating}</Typography>
            <Typography>Comment: {viewedFeedback.feedbackText}</Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Feedback;