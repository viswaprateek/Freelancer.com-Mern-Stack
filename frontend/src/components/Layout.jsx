import React from 'react';
import {
  Box,
  Container,
  CssBaseline,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  ExitToApp,
  Dashboard as DashboardIcon,
  Business as BusinessIcon,
  Apartment as ApartmentIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const Layout = ({ children }) => {
  const { userRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement logic to clear user authentication (e.g., remove cookies or clear state)
    logout();
    // Redirect to the registration page after logout
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>      <CssBaseline />

      {/* App Bar */}
      <AppBar position="fixed" sx={{ backgroundColor: '#1976D2', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ fontFamily: 'Poppins, sans-serif', flex: 1, textAlign: 'center', color: 'white' }}>
            Freelancers.com
          </Typography>
          <Typography variant="h6" component="div" sx={{ fontFamily: 'Poppins, sans-serif',  color: 'white' }}>
    Role: {userRole}
            </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: '220px',
          flexShrink: 0,
          zIndex: (theme) => theme.zIndex.drawer,
          '& .MuiDrawer-paper': {
            width: '220px',
            backgroundColor: '#1976D2',
          },
        }}
      >
        <Toolbar />
        <List>
    
            <>
              <ListItem button component={Link} to="/user/dashboard" sx={{ mb: 2, color: 'white' }}>
                <DashboardIcon />
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem button component={Link} to="/user/jobs" sx={{ mb: 2, color: 'white' }}>
                <BusinessIcon />
                <ListItemText primary="Jobs" />
              </ListItem>
          {/* Conditional menu item for Freelancer */}
           {/* {userRole === "FREELANCER" && (
              <ListItem button component={Link} to="/user/bids" sx={{ mb: 2, color: 'white' }}>
                <ApartmentIcon />
                <ListItemText primary="My Jobs" />
              </ListItem>
                  )} */}
              <ListItem button component={Link} to="/user/myjobs" sx={{ mb: 2, color: 'white' }}>
                <ApartmentIcon />
                <ListItemText primary="My Jobs" />
              </ListItem>
              <ListItem button component={Link} to="/user/profile" sx={{ mb: 2, color: 'white' }}>
                <AccountCircleIcon />
                <ListItemText primary="Profile" />
              </ListItem>
              <Button sx={{ color: 'white', marginTop: 'auto' }} onClick={handleLogout}>
                <ExitToApp />
                   Logout
              </Button>
            </>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          overflow: 'auto', // Enable scrolling
          height: 'calc(100vh - 64px)', // Adjust the height as needed
        }}
      >
        <Toolbar />
        {children}
      </Box>

      {/* Footer */}
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        sx={{ backgroundColor: '#1976D2', py: 2, color: 'white', mt: 'auto', position: 'fixed', bottom: 0, width: '100%' }}
      >
        @Freelancers.com 2023 Pvt. Ltd.
      </Typography>
    </Box>
  );
};

export default Layout;

