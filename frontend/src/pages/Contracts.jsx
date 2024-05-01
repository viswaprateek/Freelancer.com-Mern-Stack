import React, { useEffect, useState } from 'react';
import { getContractsByUser } from '../api'; // API method to be implemented
import { Card, Grid, Typography, Button } from '@mui/material';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';


const ContractsComponent = () => {
  const [contracts, setContracts] = useState([]);
  const { userId } = useAuth(); // Assume a hook to fetch user ID

  useEffect(() => {
    if (userId) { // Ensure userId is available before fetching
      fetchContracts();
    }
  }, [userId]); // Add userId as a dependency

  const fetchContracts = async () => {
    try {
      const data = await getContractsByUser(userId);
      console.log('Contracts data:', data); // Log the data received
      setContracts(data);
    } catch (error) {
      console.error('Failed to fetch contracts', error);
    }
  };
  

  return (
    <Layout>
    <Grid container spacing={2}>
      {contracts.map((contract, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <Typography variant="h5">{contract.jobId.title}</Typography>
            <Typography variant="body1">Amount: ${contract.bidAmount}</Typography>
            <Typography variant="body2">Completion Date: {new Date(contract.completionDate).toLocaleDateString()}</Typography>
            <Button component={Link} to={`/contracts/${contract._id}`}>Info</Button>
          </Card>
        </Grid>
      ))}
    </Grid>
    </Layout>
  );
};

export default ContractsComponent;
