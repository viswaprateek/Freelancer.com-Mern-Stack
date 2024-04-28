import React, { useState, useEffect } from 'react';
import { updateJob, getJobById } from '../api';
import { Button, TextField, Modal, Box, Typography } from '@mui/material';

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

const EditJobForm = ({ open, onClose, job, onJobUpdated }) => {
  const [jobData, setJobData] = useState({ title: '', description: '', budget: { min: 0, max: 0 }, skillsRequired: [], status: '' });

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const fetchedJobData = await getJobById(job.jobId);
        setJobData(fetchedJobData);
      } catch (error) {
        console.error('Error fetching job:', error);
      }
    };

    if (job) {
      fetchJobData();
    }
  }, [job]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedJob = await updateJob(job.jobId, jobData);
      onJobUpdated(updatedJob);
      onClose();
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6">Edit Job</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            multiline
            rows={4}
            value={jobData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Minimum Budget"
            name="minBudget"
            type="number"
            value={jobData.budget.min}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Maximum Budget"
            name="maxBudget"
            type="number"
            value={jobData.budget.max}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Skills Required"
            name="skillsRequired"
            value={jobData.skillsRequired.join(',')}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Status"
            name="status"
            value={jobData.status}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Update Job
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default EditJobForm;
