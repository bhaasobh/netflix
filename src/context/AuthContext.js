import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profileID, setProfileID] = useState(null); 
  const [mediaType, setMediaType] = useState('movie');

  useEffect(() => {
    const storedUser = localStorage.getItem('auth');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('auth', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setProfileID(null); 
    localStorage.removeItem('auth');
  };
  

  return (
    <AuthContext.Provider value={{ user, login, logout,profileID, setProfileID, mediaType, setMediaType   }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
