import { Box, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import SearchIcon from '@mui/icons-material/Search';
import HandshakeIcon from '@mui/icons-material/Handshake'; // This is a placeholder, import a relevant icon

function UserFlowSection() {
  return (
    <Box sx={{ p: 4, backgroundColor: '#f9f9f9' }}>
      <Typography variant="h4" color="primary.main" gutterBottom align="center">
        How Freelancers.com Works
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {/* Step 1: Post a Job */}
        <Grid item xs={12} md={4}>
          <Card sx={{ maxWidth: 345, minHeight: 400 }}>
            <CardMedia>
              <PostAddIcon sx={{ fontSize: 60, color: 'primary.main', p: 2 }} />
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Post a Job
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Clients post detailed job descriptions, outlining their requirements and expectations.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Step 2: Find & Bid */}
        <Grid item xs={12} md={4}>
          <Card sx={{ maxWidth: 345, minHeight: 400 }}>
            <CardMedia>
              <SearchIcon sx={{ fontSize: 60, color: 'primary.main', p: 2 }} />
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Find & Bid
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Freelancers browse through listed jobs, applying their expertise to bid on opportunities.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Step 3: Connect & Collaborate */}
        <Grid item xs={12} md={4}>
          <Card sx={{ maxWidth: 345, minHeight: 400 }}>
            <CardMedia>
              <HandshakeIcon sx={{ fontSize: 60, color: 'primary.main', p: 2 }} /> {/* Placeholder Icon */}
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Connect & Collaborate
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Once a bid is accepted, a collaborative workspace is created for the client and freelancer to connect and start the project.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserFlowSection;
