import React from 'react';
import { deleteJob } from '../api';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const DeleteJob = ({ jobId, open, onClose, onJobDeleted }) => {
  const handleDelete = async () => {
    try {
      console.log(jobId)
      await deleteJob(jobId);
      onJobDeleted(jobId);
       // Callback to update the job list
      onClose(); // Close the dialog
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Job</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this job? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleDelete} color="error">Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteJob;
