import { Box, Typography, Card, CardContent, Grid } from '@mui/material';

function AboutSection() {
  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" color="secondary.main">Our Mission</Typography>
              <Typography paragraph>
                Freelancers.com aims to create opportunities...
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" color="secondary.main">How It Works</Typography>
              <Typography paragraph>
                Clients post jobs, freelancers bid, and the best match is made...
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" color="secondary.main">Join Us</Typography>
              <Typography paragraph>
                Become a part of our growing community of professionals...
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AboutSection;
