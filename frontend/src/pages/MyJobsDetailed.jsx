import React from 'react'
import Layout from '../components/Layout'
import ChatBox from '../components/ChatBox'
import { useParams } from 'react-router-dom';
import Feedback from '../components/Feedback';
import ViewJob from '../components/ViewJob';

const MyJobsDetailed = () => {
  const { id, bidId } = useParams(); // Get the job ID from the URL

  return (
    <Layout>

        <h1>Contracts</h1>
      <ViewJob jobId={id} />

      {/* <Feedback bidId={bidId} /> */}
        <ChatBox jobId={id}  bidId={bidId}/>
    </Layout>
  )
}

export default MyJobsDetailed