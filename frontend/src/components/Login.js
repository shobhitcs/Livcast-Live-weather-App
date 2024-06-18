import React, { useState } from 'react';
import { TextField, Button, LinearProgress, Box, Alert } from '@mui/material';
import '../Styles/Form.css';
import { useLogin } from "../hooks/useLogin";
import { NavLink } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(formData);
    await login(formData.email, formData.password);
    setFormData({
      email: '',
      password: '',
    });
  };
  const handleGuest = async (event) => {
    event.preventDefault();
    setFormData({
      email: 'guest@example.com',
      password: '123456',
    });
    await login('guest@example.com', '12345678');
  }

  return (
    <>
      <form className="formContainer" onSubmit={handleSubmit}>
        <div className="form-box">
          <h1 className="form-head">SIGN IN</h1>

          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          {error && <Alert severity="error" sx={{width: '100%'}}>Login Failed ! Try Again</Alert>}

          <NavLink style={{ 'width': '100%', textDecoration: 'none' }} to="/">
            <div className="forget">Forget password ?</div>
          </NavLink>
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={isLoading}>
            Login
          </Button>
          <Button onClick={handleGuest} variant="contained" fullWidth disabled={isLoading} sx={{ marginTop: '10px' }}>
            Login as Guest
          </Button>
          {/* {error && <div className="error">{error}</div>} */}

          <div className="forget">Don't have a account ?<NavLink style={{ 'width': '100%', textDecoration: 'none' }} to="/signup"> Create Account</NavLink></div>
          {isLoading && <Box sx={{ width: '100%' }}>
            <div className="load">Signing In...  Please wait for a while</div>
            <LinearProgress color='primary' />
          </Box>}
        </div>
        <br />
      </form>
    </>
  );
};

export default Login;
