import { useState } from 'react';
import { useAuth } from "../AuthContext";
import { signup } from "../api";
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';


function Signup() {
  const { login } = useAuth();
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("CLIENT");

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSignup = async () => {
    try {
      const response = await signup({
        email,
        password,
        name,
        role,
        bio: null,
        skills: null,
        portfolio: null,
        projects: null,
        bids: null
      });
      // Redirect to the dashboard or another page
      navigate('/login')
    } catch (error) {
      console.log(error)
      setError("Registration failed. Please try again.");
    }
  }
  

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="name"
          name="name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          autoComplete="name"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="email"
          label="Email"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="CLIENT">Client</option>
            <option value="FREELANCER">Freelancer</option>
          </select>
        </div>
        {error && <p>{error}</p>}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSignup}
        >
          Sign Up
        </Button>
       
      </div>
      <Box mt={8}>
        {/* Additional content or footer */}
        <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href={`/login`} variant="body2">
                  {"Login"}
                </Link>
              </Grid>
            </Grid>
      </Box>
    </Container>
  );
}

export default Signup;
