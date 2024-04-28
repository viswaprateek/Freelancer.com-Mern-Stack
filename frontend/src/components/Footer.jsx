import { Box, Typography, Grid, Link } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ bgcolor: 'primary.dark', p: 6, color: 'white' }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Freelancers.com</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography>Connect with us: <Link href="#" color="inherit">LinkedIn</Link> | <Link href="#" color="inherit">Twitter</Link></Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          {/* Additional Links or Info */}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Footer;
