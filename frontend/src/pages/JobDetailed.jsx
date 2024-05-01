import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ViewJob from '../components/ViewJob';
import BidsComponent from '../components/BidsComponent'; // Import the BidsComponent
import Layout from '../components/Layout';
import Feedback from '../components/Feedback';
import { useAuth } from '../AuthContext';
import PlaceBidForm from '../components/PlaceBidForm'; // Import the new component
import ChatBox from '../components/ChatBox';
import { getJobById } from '../api'; // Make sure you have this function to fetch job details

const JobDetailPage = () => {
  const { id } = useParams(); // Get the job ID from the URL
  const { userRole } = useAuth();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const fetchedJob = await getJobById(id);
        setJob(fetchedJob);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJob();
  }, [id]);

  if (!job) {
    return <Layout>Loading job details...</Layout>; // Or some other loading indicator
  }

  return (
    <Layout>
      <div>
        <h1>Job Details</h1>
        <ViewJob jobId={id} />
        
        {/* Pass the job status to the BidsComponent */}
        <BidsComponent jobId={id} jobStatus={job.status} />
        
        {userRole === 'FREELANCER' && <PlaceBidForm jobId={id} />}
        {userRole === 'CLIENT' && 
          <ChatBox jobId={id} />
        }

        {/* Conditionally render Feedback based on requirements */}
        {/* <Feedback /> */}
      </div>
    </Layout>
  );
};

export default JobDetailPage;
