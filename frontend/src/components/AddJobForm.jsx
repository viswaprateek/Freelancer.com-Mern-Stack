import React, { useState } from 'react';
import { saveJob } from '../api'; // Adjust the import path as needed
import { Button, TextField, Modal, Box } from '@mui/material';
import { useAuth } from '../AuthContext'; // Import useAuth hook

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const AddJobForm = ({ open, onClose, onJobAdded }) => {
  const { userId , accessToken } = useAuth(); // Access userId from AuthContext
  const [jobData, setJobData] = useState({ title: '', description: '', budgetMin: 0, budgetMax: 0, skillsRequired: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleSubmit = async (event) => {
    console.log(userId)
    event.preventDefault();
    try {
      const newJob = {
        title: jobData.title,
        description: jobData.description,
        budget: { min: parseInt(jobData.budgetMin), max: parseInt(jobData.budgetMax) },
        skillsRequired: jobData.skillsRequired.split(',').map(skill => skill.trim()),
        status: 'open', // Set status to 'open' for new jobs
        bids: [], // Initialize with an empty array for bids
      };
  
      // Pass userId to saveJob function
      const savedJob = await saveJob(newJob, accessToken);
      onJobAdded(savedJob);
      setJobData({ title: '', description: '', budgetMin: 0, budgetMax: 0, skillsRequired: '' });
      onClose();
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };
  

  return (

    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-job-modal-title"
    >
      <Box sx={style}>
        <h2 id="add-job-modal-title">Add New Job</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Description"
            name="description"
            value={jobData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Budget Min"
            name="budgetMin"
            type="number"
            value={jobData.budgetMin}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Budget Max"
            name="budgetMax"
            type="number"
            value={jobData.budgetMax}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Skills Required (comma-separated)"
            name="skillsRequired"
            value={jobData.skillsRequired}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Add Job
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddJobForm;
