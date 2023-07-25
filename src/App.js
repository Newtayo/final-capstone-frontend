import React, { useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Home from './components/Home';
import Nav from './components/Nav';
import Login from './components/user-sessions/login';
import Signup from './components/user-sessions/signup';
import { fetchLaptops } from './redux/laptop/laptopSlice';
import { userSession } from './redux/user/sessionSlice';
import SingleLaptop from './components/SingleLaptop';
import AddLaptop from './components/user-actions/AddLaptop';
import Reservation from './components/Reservation';
import './App.css';
import Reserve from './components/Reserve';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLaptops());
    if (localStorage.getItem('user')) {
      const username = localStorage.getItem('user');
      dispatch(userSession({ username }, 'login'));
    }
  }, [dispatch]);
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/add_laptop" element={<AddLaptop />} />
        <Route path="/laptop/:id" element={<SingleLaptop />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/reservations" element={<Reservation />} />
      </Routes>
    </Router>
  );
};

export default App;
