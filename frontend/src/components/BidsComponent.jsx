import React, { useState, useEffect } from 'react';
import { getBidsByJobId, acceptBid } from '../api'; // Importing API functions
import { Box, Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { useAuth } from '../AuthContext';

const BidsComponent = ({ jobId }) => {
  const [bids, setBids] = useState([]);
  const [noBidsAvailable, setNoBidsAvailable] = useState(false);
  const { userRole } = useAuth(); // Access userRole from AuthContext

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const fetchedBids = await getBidsByJobId(jobId);
        if (!fetchedBids.length) {
          setNoBidsAvailable(true);
        } else {
          setBids(fetchedBids);
          setNoBidsAvailable(false);
        }
      } catch (error) {
        console.error('Error fetching bids:', error);
        setNoBidsAvailable(true); // Assume no bids if there's an error
      }
    };

    fetchBids();
  }, [jobId]);

  if (noBidsAvailable) {
    return (
      <Box textAlign="center" m={2}>
        <Typography variant="h5">No bids available for this project.</Typography>
      </Box>
    );
  }

  const handleAcceptBid = async (bidId) => {
    if (!bidId) {
      console.error('Bid ID is undefined');
      return;
    }
    
    try {
      await acceptBid(bidId);
      // Refresh or update the bid list to reflect changes
      setBids(bids.filter(bid => bid._id !== bidId));
    } catch (error) {
      console.error('Error accepting bid:', error);
    }
  };
  

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center" gutterBottom>
          Bids for Project
        </Typography>
      </Grid>
      {bids.map((bid, index) => (
  <Grid item xs={12} sm={6} md={4} key={index}>
    <Card>
      <CardContent>
        <Typography variant="h6">Amount: ${bid.amount}</Typography>
        <Typography variant="body2">
          Proposed Completion Date: {new Date(bid.proposedCompletionDate).toLocaleDateString()}
        </Typography>
        {userRole === 'CLIENT' && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAcceptBid(bid._id)}  // Assuming the ID is stored in _id
            sx={{ marginTop: 2 }}
          >
            Accept Bid
          </Button>
        )}
      </CardContent>
    </Card>
  </Grid>
))}

    </Grid>
  );
};

export default BidsComponent;
