import { Box, Button, Grid } from '@mui/material';

function CTASection() {
  return (
    <Box sx={{ p: 4, textAlign: 'center', backgroundColor: '#e3f2fd' }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button variant="contained" color="primary" size="large">Client Register</Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" size="large">Freelancer Register</Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CTASection;
