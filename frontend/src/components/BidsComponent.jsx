import React, { useState, useEffect } from 'react';
import { getBidsByJobId, acceptBid } from '../api'; // Make sure to implement the acceptBid API function
import { Box,Card, CardContent, Typography, Grid, Button } from '@mui/material';
import {useAuth} from '../AuthContext'

const BidsComponent = ({ jobId }) => {
  const [bids, setBids] = useState([]);
  const [noBidsAvailable, setNoBidsAvailable] = useState(false);
  const { userRole } = useAuth(); // Assuming useAuth provides the userRole

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const fetchedBids = await getBidsByJobId(jobId);
        // console.log(fetchedBids)
        if (fetchedBids === 'Bad Request, No jobs found' || fetchedBids.length == 0) {
          setNoBidsAvailable(true);
        } else {
          setBids(fetchedBids);
          setNoBidsAvailable(false);
        }      } catch (error) {
        console.error('Error fetching bids:', error);
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
    try {
      // Implement the logic to accept a bid
      await acceptBid(bidId);
      // Optionally, you can refresh the list of bids or update the state to reflect the accepted bid
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
      // Check if bid is not null and bid.user exists
      bid && bid.user ? (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardContent>
              <Typography variant="h6">Bid by: {bid.user.name || 'Unknown User'}</Typography>
              <Typography variant="body1">Amount: ${bid.amount}</Typography>
              <Typography variant="body2">
                Proposed Completion Date: {new Date(bid.proposedCompletionDate).toLocaleDateString()}
              </Typography>
              {userRole === 'CLIENT' && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAcceptBid(bid.bidId)}
                  sx={{ marginTop: 2 }}
                >
                  Accept Bid
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>
      ) : null // Render nothing if bid or bid.user is null
    ))}
  </Grid>
  );
};

export default BidsComponent;
