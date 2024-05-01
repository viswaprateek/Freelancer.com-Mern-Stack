import React, { useState, useEffect } from 'react';
import { getJobs } from '../api';
import { getspecificJobs } from '../api';
import { Card, CardContent, CardActions, Button, Typography, Grid, IconButton, Link as MuiLink } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditJobForm from './EditJobForm';
import DeleteJob from './DeleteJob';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
// import { getJobs, updateJob, deleteJob } from '../api';


const GetJobs = () => {
  
  const [jobs, setJobs] = useState([]);
  const [editJobModalOpen, setEditJobModalOpen] = useState(false);
  const [deleteJobDialogOpen, setDeleteJobDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const { userRole, userId } = useAuth(); // Assuming useAuth provides the userRole and userId
  console.log(userRole,userId)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        let fetchedJobs = [];
        if (userRole === 'CLIENT') {
          
          fetchedJobs = await getspecificJobs(userId);
        } else {
          fetchedJobs = await getJobs();
        }
        console.log("Fetched Jobs:", fetchedJobs); // Log the fetched jobs to inspect their structure
        setJobs(fetchedJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
  
    if (userId) {
      fetchJobs();
    }
  }, [userRole, userId]);
  
  
  

  const openEditModal = (job) => {
    setSelectedJob(job);
    setEditJobModalOpen(true);
  };

  const openDeleteDialog = (jobId) => {
    setSelectedJob({ id: jobId });
    setDeleteJobDialogOpen(true);
  };

  const handleJobUpdated = (updatedJob) => {
    const updatedJobs = jobs.map(job => job.jobId === updatedJob.jobId ? updatedJob : job);
    setJobs(updatedJobs);
    setEditJobModalOpen(false);
  };
  

  const handleJobDeleted = (jobId) => {
    const updatedJobs = jobs.filter(job => job.jobId !== jobId);
    setJobs(updatedJobs); // Make sure you are using the correct identifier for job
    setDeleteJobDialogOpen(false);
  };
  
  return (
    <Grid container spacing={2}>
      {jobs.map((job, index) => (
  <Grid item xs={12} sm={6} md={4} key={index}>
    <Card>
      <CardContent>
        <MuiLink to={`/user/jobs/${job._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="h5" component="div">{job.title}</Typography>
        </MuiLink>
        <Typography variant="h7">{job.description}</Typography>
        <Typography variant="h6">{job.status}</Typography>

        <Typography variant="body1" color="text.secondary">
          Budget: ${job.budget ? job.budget.min : 0} - ${job.budget ? job.budget.max : 0}
        </Typography>
      </CardContent>
      <CardActions>
  { job.status === 'open' && (
    <>
      <Button size="small" component={Link} to={`/user/jobs/${job._id}`}>Learn More</Button>

      <IconButton onClick={() => openEditModal(job)} color="primary"><EditIcon /></IconButton>
      <IconButton onClick={() => openDeleteDialog(job._id)} color="error"><DeleteIcon /></IconButton>
    </>
  )}
    {userRole === 'CLIENT'&& job.status === 'closed' && (
    <>
      <Button size="small" component={Link} to={`/user/jobs/${job._id}`}>View Bid</Button>

      
    </>
  )}
</CardActions>

    </Card>
  </Grid>
))}

<DeleteJob
  jobId={selectedJob?._id} // Changed from selectedJob?.jobId to selectedJob?._id
  open={deleteJobDialogOpen}
  onClose={() => setDeleteJobDialogOpen(false)}
  onJobDeleted={handleJobDeleted}
/>

<EditJobForm
  open={editJobModalOpen}
  onClose={() => setEditJobModalOpen(false)}
  job={selectedJob} // Make sure the job object has _id
  onJobUpdated={handleJobUpdated}
/>


    </Grid>
  );
};

export default GetJobs;
