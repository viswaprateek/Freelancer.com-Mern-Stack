import React, { useState, useEffect } from 'react';
import { getContracts } from '../api'; // Replace with your actual API call
import { Button, Card, CardContent, Typography, Grid, Box } from '@mui/material';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

const ContractsComponent = () => {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const fetchedContracts = await getContracts(); // Function to fetch contracts
        setContracts(fetchedContracts);
        // console.log(fetchContracts)
      } catch (error) {
        console.error('Error fetching contracts:', error);
      }
    };

    fetchContracts();
  }, []);

  if (contracts.length === 0) {
    return (
      <Layout>
        <Box sx={{ m: 3, textAlign: 'center' }}>
          <Typography variant="h5">No contracts available.</Typography>
        </Box>
      </Layout>
    );
  }
  return (
    <Layout>

    <Box sx={{ flexGrow: 1, m: 3 }}>
      <h1>My Contracts</h1>
      <Grid container spacing={2}>

        {contracts.map((contract, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>

            <Card>
              <CardContent>
                <Typography variant="h6">{contract.job.title}</Typography>
                <Typography variant="body1">Bid Amount: ${contract.amount}</Typography>
                <Typography variant="body2">
                  Proposed Completion Date: {new Date(contract.proposedCompletionDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">
                  Status: {contract.closed ? 'Closed' : 'Open'}
                </Typography>
                {/* Add more details as necessary */}

              <Button size="small" component={Link} to={`/user/myjobs/${contract.job.jobId}/${contract.bidId}`}>Learn More</Button>

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
        </Layout>
    
  );
};

export default ContractsComponent;
