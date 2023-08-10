import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import { useSelector } from 'react-redux';
import DashBoard from './components/Dashboard';
import { useVerifyUser } from './hooks/useVerifyUser';
import { useEffect } from 'react';
import { CircularProgress,Snackbar,Alert } from '@mui/material';

function App() {
  const user = useSelector((state) => {
    return state.users.user;
  })
  // const person = useSelector((state) => {
  //   return state.persons.person;
  // })

  const { verifystate, isVerifying } = useVerifyUser();

  useEffect(() => {
    verifystate();
  }, []);
  const [open, setOpen] = React.useState(true);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  return (
    <div className="App">
      <BrowserRouter>

        <Navbar />
        {isVerifying && (
          <div className="load-verify" style={{ paddingTop: '70px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress />
          </div>
        )}
        {!isVerifying &&
          <Routes>
            <Route path='/' element={!user ? <Home /> : <DashBoard />} />
            <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path='/signup' element={!user ? <Signup /> : <Navigate to="/" />} />
          </Routes>}
      </BrowserRouter>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
        Please be aware that our website's backend is hosted on a free server, which might lead to initial response times of over 30 seconds; subsequent responses will be much quicker as the server goes to sleep after periods of inactivity.
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
