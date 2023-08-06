import React, { useState } from 'react';
import '../Styles/Form.css';
import { useSignup } from "../hooks/useSignup";
import { TextField, Button, LinearProgress, Box, Alert } from '@mui/material';
// import { useSelector } from "react-redux";


const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // const person = useSelector((state) => {
  //   return state.persons.person;
  // })
  //  console.log(person,123456789);

  const handleChange = (event) => {
    const { name, value} = event.target;

    setFormData({ ...formData, [name]: value });
  };
  const {signup,error,isLoading} = useSignup();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(formData);
    await signup(formData);
    setFormData({
      name: '',
      email: '',
      password: '',
    });
  };

  return (
    <form className="formContainer" onSubmit={handleSubmit}>
      <div className="form-box">
        <h1 className="form-head">SIGNUP</h1>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
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
        {error && <Alert severity="error" sx={{width: '100%'}}>Sign Up Failed ! Try Again</Alert>}
        <Button fullWidth type="submit" variant="contained" color="primary" disabled={isLoading}>
          Sign Up
        </Button>
        {/* {error && <div className="error">{error}</div>} */}
        {isLoading &&  <Box sx={{ width: '100%' }}>
            <div className="load">Signing Up...  Please wait for a while</div>
            <LinearProgress color='primary' />
          </Box>}
      </div>
    </form>
  );
};

export default Signup;
