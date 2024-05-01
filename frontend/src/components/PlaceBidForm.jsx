import React, { useState } from 'react';
import { Button, Dialog, DialogContent, DialogActions, TextField, Box } from '@mui/material';
import { placeBid } from '../api'; // Import the API function to place a bid
import { useAuth } from '../AuthContext'; // Import useAuth to access user context

const PlaceBidForm = ({ jobId }) => {
  const [open, setOpen] = useState(false);
  const [bidData, setBidData] = useState({ amount: '', proposedCompletionDate: '' });
  const { userId } = useAuth(); // Access userId from the auth context

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setBidData({ ...bidData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const formattedBidData = {
        ...bidData,
        jobId: jobId,
        userId: userId, // Include the userId in the bid data
        proposedCompletionDate: `${bidData.proposedCompletionDate}T00:00:00`
      };
      await placeBid(formattedBidData);
      handleClose();
      // Optionally, refresh the bids or show a success message
    } catch (error) {
      console.error('Error placing bid:', error);
    }
  };

  return (
    <>
      <Box textAlign="center" m={2}>
        <Button variant="contained" color="primary" size="large" onClick={handleOpen}>
          Place a Bid
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            label="Bid Amount"
            type="number"
            fullWidth
            margin="dense"
            name="amount"
            value={bidData.amount}
            onChange={handleChange}
          />
          <TextField
            label="Proposed Completion Date"
            type="date"
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
            name="proposedCompletionDate"
            value={bidData.proposedCompletionDate}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Submit Bid</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PlaceBidForm;
