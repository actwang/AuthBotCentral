import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from "./firebase";
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            console.log(userCredential);
            navigate('/homepage');
          })
          .catch((error) => {
            console.log(error);
          });
      };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Sign In
      </Typography>
      <form onSubmit={handleSignIn}>
        <TextField
          type="email"
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type="password"
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >Log in
        </Button>
        {
          <Typography variant="body2" color="error" align="center">
          </Typography>
        }
      </form>
    </Container>
  );
};

export default SignIn;