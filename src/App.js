import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import WhoIsWatching from './pages/whoswatching';
import ReviewPage from './pages/ReviewPage';
import MyListPage from './pages/MyListPage';
import Admin from './pages/Admin'

import { AuthProvider } from './context/AuthContext';

const App = () => (
  <Router>
     <AuthProvider>
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/whoiswatching" element={<WhoIsWatching />} />
      <Route path="/Review/:mediaId" element={<ReviewPage />} />
      <Route path="/MyList" element={<MyListPage />} />
      <Route path="/Admin" element={<Admin />} />
    </Routes>
    </AuthProvider>
  </Router>
);

export default App;
