import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { viewProfile, saveProfile } from '../api';
import { TextField, Button, Box, Typography } from '@mui/material';

const Profile = ({ userId }) => { // Receive userId as a prop
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    location: '',
    about: ''
  });
  const [canEdit, setCanEdit] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await viewProfile(userId); // Pass userId to viewProfile function
        setProfileData({
          name: data.user.name || '',
          email: data.user.email,
          location: data.user.profile.location || '', // Assuming location is nested under profile
          about: data.user.profile.about || '' // Assuming about is nested under profile
        });
        setCanEdit(data.canEdit);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileData({ ...profileData, [name]: value });
  };

// ... (rest of your component)

const handleSubmit = async (event) => {
  event.preventDefault();
  if (!canEdit) {
    return; // Prevent profile update if user does not have edit permissions
  }

  const profileUpdateData = {
    name: profileData.name,
    email: profileData.email,
    profile: {
      location: profileData.location,
      about: profileData.about
    }
    // Add other necessary fields if they exist
  };

  try {
    await saveProfile(profileUpdateData); // saveProfile should send profileUpdateData to your API
    // Handle success (show a message or update UI)
  } catch (error) {
    console.error('Error saving profile:', error);
  }
};

// ... (rest of your component)


  return (
    <Layout>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Typography variant="h6">Profile Information</Typography>
        <TextField
          margin="normal"
          fullWidth
          label="Name"
          name="name"
          value={profileData.name}
          onChange={handleChange}
          disabled={!canEdit}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Email"
          name="email"
          value={profileData.email}
          disabled // Email is typically not editable
        />
        <TextField
          margin="normal"
          fullWidth
          label="Location"
          name="location"
          value={profileData.location}
          onChange={handleChange}
          disabled={!canEdit}
        />
        <TextField
          margin="normal"
          fullWidth
          label="About"
          name="about"
          multiline
          rows={4}
          value={profileData.about}
          onChange={handleChange}
          disabled={!canEdit}
        />
        {canEdit && (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Save Profile
          </Button>
        )}
      </Box>
    </Layout>
  );
};

export default Profile;
