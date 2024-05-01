import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getContractById } from '../api'; // Ensure this API method is correctly defined
import { Card, Typography, Box, Button } from '@mui/material';
import Layout from '../components/Layout';
import ChatComponent from '../components/ChatComponent'; // Make sure to import the ChatComponent

const ContractDetail = () => {
  const { contractId } = useParams();
  const [contract, setContract] = useState(null);
  const [showChat, setShowChat] = useState(false); // State to toggle chat display

  useEffect(() => {
    const fetchContract = async () => {
      try {
        const data = await getContractById(contractId);
        setContract(data);
      } catch (error) {
        console.error('Failed to fetch contract details', error);
      }
    };

    fetchContract();
  }, [contractId]);

  if (!contract) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <Layout>
      <Card>
        <Box padding={2}>
          <Typography variant="h5">{contract.jobId.title}</Typography>
          <Typography variant="body1">Client: {contract.clientId.name}</Typography>
          <Typography variant="body1">Freelancer: {contract.freelancerId.name}</Typography>
          <Typography variant="body1">Amount: ${contract.bidAmount}</Typography>
          <Typography variant="body2">Completion Date: {new Date(contract.completionDate).toLocaleDateString()}</Typography>
          <Button variant="contained" onClick={() => setShowChat(!showChat)}>Chat</Button> {/* Toggle Chat Display */}
        </Box>
      </Card>
      {showChat && <ChatComponent contractId={contractId} />} {/* Conditionally render ChatComponent */}
    </Layout>
  );
};

export default ContractDetail;
