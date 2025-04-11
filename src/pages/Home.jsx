import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome, {user.email} 👋</h1>
      <p style={styles.text}>Your role: <strong>{user.role}</strong></p>
      <button style={styles.button} onClick={handleLogout}>Logout</button>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#141414',
    color: 'white',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Netflix Sans, sans-serif',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '10px',
  },
  text: {
    fontSize: '1.2rem',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#e50914',
    border: 'none',
    color: 'white',
    fontSize: '1rem',
    borderRadius: '5px',
    cursor: 'pointer',
  }
};

export default Home;
