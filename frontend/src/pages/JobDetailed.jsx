import React from 'react';
import { useParams } from 'react-router-dom';
import ViewJob from '../components/ViewJob';
import BidsComponent from '../components/BidsComponent'; // Import the BidsComponent
import Layout from '../components/Layout';
import Feedback from '../components/Feedback';
import { useAuth } from '../AuthContext';
import PlaceBidForm from '../components/PlaceBidForm'; // Import the new component
import ChatBox from '../components/ChatBox'

const JobDetailPage = () => {
  const { id } = useParams(); // Get the job ID from the URL
  const { userRole } = useAuth();

  return (
    <Layout>

    <div>
      <h1>Job Details</h1>
      <ViewJob jobId={id} />
      
      <BidsComponent jobId={id} />
      {userRole === 'FREELANCER' && <PlaceBidForm jobId={id} />}
      {/* {userRole === 'CLIENT' && 
        <ChatBox jobId={id}  bidId={bidId}/>
      
      } */}

      {/* <Feedback /> */}
      <Layout>
      
     
      
      <ChatBox jobId={id} />
    </Layout>
    </div>
    </Layout>
  );
};

export default JobDetailPage;
