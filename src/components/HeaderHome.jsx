import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaBell } from 'react-icons/fa';
import config from '../config';
import { useAuth } from '../context/AuthContext';

const HeaderHome = ({ profile }) => {
  const { setMediaType } = useAuth();
    
  const [avatar, setAvatar] = useState(null);
    

  useEffect(() => {
    if (profile) {
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
          <Link to="/whoiswatching" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
          <Link onClick={() => setMediaType('tv')} style={{ color: 'white', textDecoration: 'none' }}>TV Shows</Link>
          <Link onClick={() => setMediaType('movie')} style={{ color: 'white', textDecoration: 'none' }}>Movies</Link>
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
