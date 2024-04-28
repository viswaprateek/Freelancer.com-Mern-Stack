import React, { useState, useEffect } from 'react';
import { getJobById } from '../api'; // Make sure this points to your API utility
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';

const ViewJob = ({ jobId }) => {
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const fetchedJob = await getJobById(jobId);
        setJob(fetchedJob);
      } catch (error) {
        console.error('Error fetching job:', error);
      }
    };

    fetchJob();
  }, [jobId]);

  if (!job) {
    return <Box>Loading...</Box>;
  }

  return (
    <Card>  
      <CardContent>
        <Typography variant="h5">{job.job.title}</Typography>
        <Typography variant="body1">{job.job.description}</Typography>
        <Typography variant="body2" color="text.secondary">
          Budget: ${job.job.budget}
        </Typography>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Author: {job.job.author.username}</Typography>
            <Typography variant="subtitle2">Location: {job.job.author.profile?.location}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Total Jobs: {job.totalJobsNo}</Typography>
            <Typography variant="subtitle2">Hired Jobs: {job.hiredJobsNo}</Typography>
            <Typography variant="subtitle2">Hire Rate: {job.hireRate}%</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ViewJob;
