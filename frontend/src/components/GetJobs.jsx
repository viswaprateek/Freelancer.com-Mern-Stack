import React, { useState, useEffect } from 'react';
import { getJobs, getspecificJobs } from '../api';  // Ensure proper imports
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
  const { userRole, userId } = useAuth();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const fetchedJobs = userRole === 'CLIENT' ? await getspecificJobs(userId) : await getJobs();
        setJobs(fetchedJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, [userRole, userId]);

  const openEditModal = job => {
    setSelectedJob(job);
    setEditJobModalOpen(true);
  };

  const openDeleteDialog = job => {
    setSelectedJob(job);
    setDeleteJobDialogOpen(true);
  };

  const handleJobUpdated = updatedJob => {
    const updatedJobs = jobs.map(job => job._id === updatedJob._id ? updatedJob : job);
    setJobs(updatedJobs);
    setEditJobModalOpen(false);
  };

  const handleJobDeleted = jobId => {
    setJobs(jobs.filter(job => job._id !== jobId));
    setDeleteJobDialogOpen(false);
  };

  return (
    <Grid container spacing={2}>
      {jobs.map((job, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardContent>
              <MuiLink to={`/user/jobs/${job._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="h5">{job.title}</Typography>
              </MuiLink>
              <Typography variant="body2">{job.description}</Typography>
              <Typography variant="body2" color="text.secondary">
                Budget: {job.budget ? `${job.budget.min} - ${job.budget.max}` : 'No budget set'}
              </Typography>
            </CardContent>
            
              <CardActions>
                {job.status === 'open' && (
                  <>
                      <Button size="small" component={Link} to={`/user/jobs/${job._id}`}>Learn More</Button>
                      </>
              )}
              {job.status === 'open' && userRole === 'CLIENT' && (
                  <>
                     
                      <IconButton onClick={() => openEditModal(job)} color="primary"><EditIcon /></IconButton>
                      <IconButton onClick={() => openDeleteDialog(job._id)} color="error"><DeleteIcon /></IconButton>
                  </>
              )}
              {job.status === 'closed' && userRole === 'CLIENT' && (
                  <Button size="small" component={Link} to={`/user/jobs/${job._id}`}>View Bids</Button>
              )}
          </CardActions>
           
          </Card>
        </Grid>
      ))}
      {selectedJob && (
        <>
          <DeleteJob
            jobId={selectedJob._id}
            open={deleteJobDialogOpen}
            onClose={() => setDeleteJobDialogOpen(false)}
            onJobDeleted={handleJobDeleted}
          />
          <EditJobForm
            open={editJobModalOpen}
            onClose={() => setEditJobModalOpen(false)}
            job={selectedJob}
            onJobUpdated={handleJobUpdated}
          />
        </>
      )}
    </Grid>
  );
};

export default GetJobs;
