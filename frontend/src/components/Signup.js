import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import Checkbox from '@mui/material/Checkbox';
// import FormControlLabel from '@mui/material/FormControlLabel';
import '../styles/formStyle.css';
import { useSignup } from "../hooks/useSignup";
import { useSelector } from "react-redux";


const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    // isStudent: false,
    // rollnumber: '',
    password: '',
  });

  const person = useSelector((state) => {
    return state.persons.person;
  })
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
      // isStudent: false,
      // rollnumber: '',
      password: '',
    });
  };

  return (
    <form className="formContainer" onSubmit={handleSubmit}>
      <div className="form-box">
        <h1 className="form-head">SIGNUP</h1>
        {/* <div className="question">
          
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.isStudent}
                onChange={handleChange}
                name="isStudent"
                color="primary"
              />
            }
            label="Yes, I am a student"
          />
        </div> */}
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
        {/* {formData.isStudent && (
            <TextField
            label="Roll Number"
            name="rollnumber"
            type="number"
            value={formData.rollnumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
        )} */}
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
        <Button fullWidth type="submit" variant="contained" color="primary">
          Sign Up
        </Button>
        {error && <div className="error">{error}</div>}
      </div>
    </form>
  );
};

export default Signup;
