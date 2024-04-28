import React, { useState } from 'react';
import { Button, Dialog, DialogContent, DialogActions, TextField, Box } from '@mui/material';
import { placeBid } from '../api'; // Import the API function to place a bid

const PlaceBidForm = ({ jobId }) => {
  const [open, setOpen] = useState(false);
  const [bidData, setBidData] = useState({ amount: '', proposedCompletionDate: '' });

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
        // Append a default time part to the date
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
            onChange={handleChange}
          />
          <TextField
            label="Proposed Completion Date"
            type="date"
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
            name="proposedCompletionDate"
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
