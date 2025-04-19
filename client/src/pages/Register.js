import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import { Container, TextField, Button, Typography, Paper } from '@mui/material';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const data = await registerUser({ name, email, password });
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Name" fullWidth sx={{ mb: 2 }} value={name} onChange={e => setName(e.target.value)} required />
          <TextField label="Email" type="email" fullWidth sx={{ mb: 2 }} value={email} onChange={e => setEmail(e.target.value)} required />
          <TextField label="Password" type="password" fullWidth sx={{ mb: 2 }} value={password} onChange={e => setPassword(e.target.value)} required />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
