import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';


import { AuthProvider } from './context/AuthContext';

const App = () => (
  <Router>
     <AuthProvider>
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/home" element={<Home />} />
      <Route path="/SignUp" element={<SignUp />} />
    </Routes>
    </AuthProvider>
  </Router>
);

export default App;
