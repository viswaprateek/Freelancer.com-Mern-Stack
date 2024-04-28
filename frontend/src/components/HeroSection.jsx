import { Box, Typography, Button, Grid } from '@mui/material';

function HeroSection() {
  return (
    <Box sx={{ p: 4, backgroundColor: '#f5f5f5' }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h2" color="primary.main" gutterBottom>
            Connecting Talent with Opportunity
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 3 }}>
            Explore a world where your skills meet the right opportunities.
          </Typography>
          <Button variant="contained" color="secondary" size="large">Get Started</Button>
        </Grid>
        <Grid item xs={12} md={6}>
          {/* Optional: Add an image or illustration here */}
        </Grid>
      </Grid>
    </Box>
  );
}

export default HeroSection;
