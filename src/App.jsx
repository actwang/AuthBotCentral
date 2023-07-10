import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import SignIn from './SignIn';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/signin" element={<SignIn/>} />
        <Route exact path="/homepage" element={<HomePage/>} />
        <Route path="/" element={<Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
}

export default App;

