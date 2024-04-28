import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import AddJobForm from '../components/AddJobForm'; // Adjust the import path as needed
import { getJobs, updateJob, deleteJob } from '../api';
import { Button } from '@mui/material';
import GetJobs from '../components/GetJobs'; // Adjust the import path as needed
import { useAuth } from '../AuthContext'; // Import the useAuth hook

const Jobs = () => {
  const { userRole } = useAuth(); // Get userRole from AuthContext
    const [jobs, setJobs] = useState([]);
    const [openModal, setOpenModal] = useState(false);

  // Existing handleEditJob and handleDeleteJob functions

  const addJobToList = (newJob) => {
    setJobs([...jobs, newJob]);
  };
  // console.log(userRole)

  return (
    <Layout>
      <div>
        <h1>Jobs</h1>
        {userRole === 'CLIENT' && (
          <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
            Add New Job
          </Button>
        )}
        <GetJobs />

        <AddJobForm open={openModal} onClose={() => setOpenModal(false)} onJobAdded={addJobToList} />        {/* Existing Jobs List */}
      </div>
    </Layout>
  );
};

export default Jobs;
