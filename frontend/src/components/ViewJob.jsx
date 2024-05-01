import React, { useState, useEffect } from 'react';
import { getJobById } from '../api';
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
        <Typography variant="h5">{job.title || 'Title not available'}</Typography>
        <Typography variant="body1">{job.description || 'Description not available'}</Typography>
        <Typography variant="body2" color="text.secondary">
          Budget: ${job.budget.min} - ${job.budget.max}
        </Typography>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              Skills Required: {job.skillsRequired && job.skillsRequired.length > 0 ? job.skillsRequired.join(', ') : 'Not specified'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Status: {job.status || 'Status not available'}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ViewJob;
