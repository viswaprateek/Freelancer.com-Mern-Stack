import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const UserDashboard = () => {
  // Example stats, replace with real data
  const stats = {
    activeProjects: 5,
    pendingBids: 3,
    totalEarnings: 12000 // Or totalSpendings for clients
  };

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>Welcome to Your Dashboard!</Typography>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6">Quick Stats</Typography>
          <Typography>Active Projects: {stats.activeProjects}</Typography>
          <Typography>Pending Bids: {stats.pendingBids}</Typography>
          <Typography>Total Earnings: ${stats.totalEarnings}</Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6">Quick Access</Typography>
          <Button component={Link} to="/user/jobs" sx={{ mr: 1 }}>View Jobs</Button>
          <Button component={Link} to="/user/bids">View Bids</Button>
          <Button component={Link} to="/user/myjobs" sx={{ ml: 1 }}>View Contracts</Button>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6">Profile Overview</Typography>
          <Button component={Link} to="/user/profile">Edit Profile</Button>
        </Box>

        {/* Add additional sections like recent activities, financial summary, etc. */}
      </Box>
    </Layout>
  );
};

export default UserDashboard;
