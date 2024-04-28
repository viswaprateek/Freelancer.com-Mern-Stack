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
          // Fetch only the jobs associated with the client's user ID
          fetchedJobs = await getspecificJobs(userId);
        } else {
          // Fetch all jobs if the user is not a client
          fetchedJobs = await getJobs();
        }
        setJobs(fetchedJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
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
    setJobs(jobs.map(job => job.id === updatedJob.id ? updatedJob : job));
    setEditJobModalOpen(false);
  };

  const handleJobDeleted = (jobId) => {
    setJobs(jobs.filter(job => job.id !== jobId));
    setDeleteJobDialogOpen(false);
  };

  return (
    <Grid container spacing={2}>
      {jobs.map((job, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardContent>
              <MuiLink to={`/user/jobs/${job.jobId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="h5" component="div">{job.title}</Typography>
              </MuiLink>
              <Typography variant="body2">{job.description}</Typography>
              
              <Typography variant="body1" color="text.secondary">
                Budget: ${job.budget ? job.budget.min : 0} - ${job.budget ? job.budget.max : 0}
              </Typography>


            </CardContent>
            <CardActions>
              <Button size="small" component={Link} to={`/user/jobs/${job.jobId}`}>Learn More</Button>
              {userRole === 'CLIENT' && (
                <>
                  <IconButton onClick={() => openEditModal(job)} color="primary"><EditIcon /></IconButton>
                  <IconButton onClick={() => openDeleteDialog(job.jobId)} color="error"><DeleteIcon /></IconButton>
                </>
              )}
            </CardActions>
          </Card>
        </Grid>
      ))}
      <EditJobForm
        open={editJobModalOpen}
        onClose={() => setEditJobModalOpen(false)}
        job={selectedJob}
        onJobUpdated={handleJobUpdated}
      />
      <DeleteJob
        jobId={selectedJob?.id} // Assuming the jobId is stored in selectedJob.id
        open={deleteJobDialogOpen}
        onClose={() => setDeleteJobDialogOpen(false)}
        onJobDeleted={handleJobDeleted}
      />
    </Grid>
  );
};

export default GetJobs;
