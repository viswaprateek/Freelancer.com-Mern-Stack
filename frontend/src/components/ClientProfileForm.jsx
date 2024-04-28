import React from 'react';
import { Button, AppBar, Toolbar, Typography, Container } from '@mui/material';
import { useAuth } from '../AuthContext';

function DashboardLayout({ title, children }) {
  const { logout } = useAuth();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Button color="inherit" onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {children}
      </Container>
    </div>
  );
}

export default DashboardLayout;
