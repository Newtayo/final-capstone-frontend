import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Nav from './components/Nav';
import Login from './components/user-sessions/login';
import Signup from './components/user-sessions/signup';
import './App.css';

const App = () => (
  <Router>
    <Nav />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/login" element={<Login />} />
      <Route path="/user/signup" element={<Signup />} />
    </Routes>
  </Router>
);

export default App;
