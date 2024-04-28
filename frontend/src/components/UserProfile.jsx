import { Card, CardContent, Typography, Button, Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

function UserProfile({ user, onEditClick }) {
  return (

    <Card>
      <CardContent>
        <Typography variant="h5">{user.name}</Typography>
        <Typography variant="body1">Email: {user.email}</Typography>
        <Typography variant="body1">Phone: {user.phone}</Typography>
        {/* Add more user details here */}
      </CardContent>
      <Button variant="contained" color="primary" onClick={onEditClick}>
        Edit Profile
      </Button>
    </Card>
  );
}

export default UserProfile;
