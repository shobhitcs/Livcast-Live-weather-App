import React, { useState } from 'react';
import { TextField, Button} from '@mui/material';
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
  const { login, error} = useLogin();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(formData);
    await login(formData.email, formData.password);
    setFormData({
      email: '',
      password: '',
    });
  };


  return (
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
        
        <NavLink style={{ 'width': '100%', textDecoration: 'none' }} to="/">
          <div className="forget">Forget password ?</div>
        </NavLink>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
        {error && <div className="error">{error}</div>}

        <div className="forget">Don't have a account ?<NavLink style={{ 'width': '100%', textDecoration: 'none' }} to="/signup"> Create Account</NavLink></div>

      </div>
      <br />
    </form>
  );
};

export default Login;
