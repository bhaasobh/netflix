import React, { useState, useEffect } from 'react';
import AddMediaForm from '../components/AddMediaForm';
import HeaderHome from '../components/HeaderHome';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';
import config from '../config';

const Admin = () => {
  const [showModal, setShowModal] = useState(false);
  const { user, profileID } = useAuth();
  const [profile, setProfile] = useState(null);

  const fetchProfile = async (profileID) => {
    try {
      const res = await fetch(`${config.SERVER_API}/user/profiles/${user.id}/${profileID}`);
      if (!res.ok) throw new Error('Failed to fetch profile');
      const profileData = await res.json();
      setProfile(profileData);
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  useEffect(() => {
    if (profileID) fetchProfile(profileID);
  }, [profileID]);

  return (
    <div style={styles.page}>
      <HeaderHome profile={profile} />
      <main style={styles.main}>
        <h1 style={styles.title}>🎬 Admin Media Panel</h1>
        <p style={styles.subtitle}>Add new movies or TV shows to your content database.</p>
        <button onClick={() => setShowModal(true)} style={styles.button}>
          ➕ Add Media
        </button>
      </main>
      <AddMediaForm show={showModal} onClose={() => setShowModal(false)} />
      <Footer />
    </div>
  );
};

export default Admin;

const styles = {
  page: {
    backgroundColor: '#141414', // Netflix dark
    minHeight: '100vh',
    color: 'white',
  },
  main: {
    padding: '60px 40px',
    textAlign: 'center',
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#e50914',
  },
  subtitle: {
    fontSize: '18px',
    color: '#b3b3b3',
    marginBottom: '30px',
  },
  button: {
    padding: '12px 30px',
    fontSize: '18px',
    backgroundColor: '#e50914',
    border: 'none',
    borderRadius: '4px',
    color: 'white',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
};
