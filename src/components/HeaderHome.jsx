import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaSearch, FaBell } from 'react-icons/fa';
import config from '../config';

const HeaderHome = ({ profileId }) => {
    
  const [avatar, setAvatar] = useState(null);
    const { user, logout } = useAuth();

  const [profile, setProfile] = useState(null);

  const fetchProfile = async (profileId) => {
    try {
      const res = await fetch(`${config.SERVER_API}/user/profiles/${user.id}/${profileId}`);
      if (!res.ok) throw new Error('Failed to fetch profile');
      const profileData = await res.json();
      setProfile(profileData);
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };


  useEffect(() => {
    console.log(`${config.SERVER_API}/user/profiles/${user.id}/${profileId}`);
   
      fetchProfile(profileId);
  }, [profileId]); 
  useEffect(() => {
    if (profile) {
      console.log('Profile updated:', profile);
      const getAvatarByName = async (name) => {
      try {
        const res = await fetch(`${config.SERVER_API}/avatar/${name}`);
        if (!res.ok) throw new Error('Avatar not found');
        const avatarData = await res.json();
        setAvatar(avatarData);
      } catch (err) {
        console.error('Failed to fetch avatar by name:', err);
      }
    };

      getAvatarByName(profile?.profilePhoto);
    }
  }, [profile]);

    

  return (
    <header style={styles.header}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={styles.logo}>NETFLIX</Link>
        <nav style={styles.nav}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
          <Link to="/tv" style={{ color: 'white', textDecoration: 'none' }}>TV Shows</Link>
          <Link to="/movies" style={{ color: 'white', textDecoration: 'none' }}>Movies</Link>
          <Link to="/new" style={{ color: 'white', textDecoration: 'none' }}>New & Popular</Link>
          <Link to="/list" style={{ color: 'white', textDecoration: 'none' }}>My List</Link>
          <Link to="/browse" style={{ color: 'white', textDecoration: 'none' }}>Browse</Link>
        </nav>
      </div>

      <div style={styles.rightIcons}>
        <FaSearch color="white" />
        <FaBell color="white" />
        <div style={styles.rightIconsProfile}>
        <div
          style={{
            ...styles.profileImg,
            backgroundImage: avatar ? `url(${avatar.url})` : 'none', 
          }}
        ></div>
        <div style={{color:'white'}}>{profile?.name}</div>
        </div>
      </div>
    </header>
  );
};

export default HeaderHome;

const styles = {
     
  header: {
    width: '100%',
    height: '92px',
    padding: '24px 48px 28px',
    background: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  logo: {
    color: '#e50914',
    fontSize: '32px',
    fontWeight: 'bold',
    fontFamily: `'Helvetica Neue', Helvetica, Arial, sans-serif`,
    textDecoration: 'none',
    marginRight: '40px',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    color: '#fff',
    fontSize: '14px',
  },
  rightIcons: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  rightIconsProfile: {
 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop:'10px'
  },
  profileImg: {
    width: '32px',
    height: '32px',
    borderRadius: '4px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    cursor: 'pointer',
  },
};
