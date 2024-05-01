import React from 'react';
import { deleteJob } from '../api';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const DeleteJob = ({ jobId, open, onClose, onJobDeleted }) => {
  const handleDelete = async () => {
    console.log(jobId)
    if (jobId) {
      try {
        await deleteJob(jobId);
        onJobDeleted(jobId);
        onClose();
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    } else {
      console.error('Job ID is undefined for delete operation');
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
