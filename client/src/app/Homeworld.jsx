import React, { useState } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Auth from '../auth/Auth.jsx';
import Dashboard from '../components/Dashboard.jsx';
import MemberDashboard from '../components/MemberDashboard.jsx';
// import session from '../helpers/clientSession.js';
// import Login from './components/Login.jsx';
// import axios from 'axios';

const Homeworld = () => {
  const [session, setSession] = useState(null);

  const cache = {
    members: new Map(),
    tasks: new Map(),
    rewards: new Map(),
  };

  return true ? (
    <Auth />
  ) : (
    <Router>
      <Routes>
        <Route path="/member" element={<MemberDashboard {...cache} />} />
        <Route exact path="/*" element={<Dashboard {...cache} />} />
      </Routes>
    </Router>
  );
};

export default Homeworld;
