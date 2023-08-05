import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import { useSelector } from 'react-redux';
import DashBoard from './components/Dashboard';
import Footer from './components/Footer';
import { useVerifyUser } from './hooks/useVerifyUser';
import { useEffect } from 'react';
// import NNavbar from './components/newnavbar';

function App() {
  const user = useSelector((state) => {
    return state.users.user;
  })
  const person = useSelector((state) => {
    return state.persons.person;
  })

  const { verifystate, isVerifying } = useVerifyUser();

  useEffect(() => {
    verifystate();
  },[]);

  console.log(person, 123);
  // console.log('out Verified'); 
  return (
    <div className="App">
      <BrowserRouter>
        {/* {!isVerifying && < Navbar />} */}
        <Navbar />
        <Routes>
          <Route path='/' element={!user ? <Home /> : <DashBoard />} />
          <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path='/signup' element={!user ? <Signup /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
