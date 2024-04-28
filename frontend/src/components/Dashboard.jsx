import { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import UserProfile from './UserProfile';
import ProfileEdit from './ProfileEdit';
import { api } from '../api'; // Ensure this path is correct
import { Container, CssBaseline } from '@mui/material';
import DashboardLayout from './DashboardLayout';

const Dashboard = () => {
  const { accessToken } = useAuth(); // Accessing the access token from AuthContext
  const [editingProfile, setEditingProfile] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/user-api/user/profile', {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        setUserProfile(response.data);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        // Handle error appropriately
      }
    };

    if (accessToken) {
      fetchUserProfile();
    }
  }, [accessToken]);

  const handleEditClick = () => {
    setEditingProfile(true);
  };

  const handleSaveProfile = async (updatedProfile) => {
    try {
      const response = await api.put('/user/profile', updatedProfile, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      setUserProfile(response.data); // Update with returned data, if applicable
      setEditingProfile(false);
      // Handle success (e.g., show a success message)
    } catch (error) {
      console.error('Failed to update profile:', error);
      // Handle error appropriately
    }
  };

  return (
    <DashboardLayout title="User Dashboard" >
    <Container>
      <CssBaseline /> 
      {userProfile ? (
        editingProfile ? (
          <ProfileEdit user={userProfile} onSave={handleSaveProfile} />
        ) : (
          <UserProfile user={userProfile} onEditClick={handleEditClick} />
        )
      ) : (
        <p>Loading profile...</p> // Or any other loading indicator
      )}  
    </Container>
    </DashboardLayout>
  );
};

export default Dashboard;
