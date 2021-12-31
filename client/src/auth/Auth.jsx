import React from 'react';
import './Auth.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './Login.jsx';
import Register from './Register.jsx';
// import './Auth.css';

const Auth = ({ updateSession }) => (
  <Router>
    <Routes>
      <Route
        path="/registration"
        element={<Register updateSession={updateSession} />}
      />
      <Route path="*" element={<Login updateSession={updateSession} />} />
    </Routes>
  </Router>
);

export default Auth;
