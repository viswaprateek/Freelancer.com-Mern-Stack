import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';

function ProfileEdit({ userId, onSave }) {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/user-api/${userId}`);
        setFormData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/user-api/${userId}`, formData);
      onSave(formData);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { m: 1 } }}>
      <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth />
      <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} fullWidth />
      <TextField label="Phone" name="phone" value={formData.phone} onChange={handleChange} fullWidth />
      {/* Add more fields as needed */}
      <Button type="submit" variant="contained" color="primary">
        Save Changes
      </Button>
    </Box>
  );
}

export default ProfileEdit;
