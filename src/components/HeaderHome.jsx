import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaBell } from 'react-icons/fa';
import config from '../config';
import { useAuth } from '../context/AuthContext';

const HeaderHome = ({ profile ,wantedPage }) => {
  const { setMediaType ,logout } = useAuth();
  const [avatar, setAvatar] = useState(null);
  const [activeLink, setActiveLink] = useState('home');



  useEffect(() => {
if(wantedPage)
{
  setActiveLink(wantedPage);
}
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
        <Link to="/home" style={styles.logo}>NETFLIX</Link>
        <nav style={styles.nav}>
          <Link
            to="/Home"
            onClick={() => {setMediaType('all');
                        setActiveLink('home');}}
            style={{
              ...styles.link,
              fontWeight: activeLink === 'home' ? 'bold' : 'normal',
            }}
          >
            Home
          </Link>
          <Link
           onClick={() => {
              setMediaType('tv');
              setActiveLink('tv');
            }} to="/Home"
            
            style={{
              ...styles.link,
              fontWeight: activeLink === 'tv' ? 'bold' : 'normal',
            }}
          >
            TV Shows
          </Link>
          <Link
            to="/Home"
            onClick={() => {
              setMediaType('movie');
              setActiveLink('movie');
            }}
            style={{
              ...styles.link,
              fontWeight: activeLink === 'movie' ? 'bold' : 'normal',
            }}
          >
            Movies
          </Link>
          <Link
            to="/Home"
            onClick={() => setActiveLink('new')}
            style={{
              ...styles.link,
              fontWeight: activeLink === 'new' ? 'bold' : 'normal',
            }}
          >
            New & Popular
          </Link>
          <Link
            to="/MyList"
            onClick={() => {setActiveLink('list'); setMediaType('mylist');}}
            style={{
              ...styles.link,
              fontWeight: activeLink === 'list' ? 'bold' : 'normal',
            }}
          >
            My List
          </Link>
          <Link
            to="/Home"
            onClick={() => setActiveLink('browse')}
            style={{
              ...styles.link,
              fontWeight: activeLink === 'browse' ? 'bold' : 'normal',
            }}
          >
            Browse
          </Link>
        </nav>
      </div>

      <div style={styles.rightIcons}>
        <FaSearch color="white" />
        <FaBell color="white" />
        <div style={styles.rightIconsProfile} onClick={logout}>
          <div
            style={{
              ...styles.profileImg,
              backgroundImage: avatar ? `url(${avatar.url})` : 'none',
            }}
          ></div>
          <div style={{ color: 'white' }}>{profile?.name}</div>
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
  link: {
    color: 'white',
    textDecoration: 'none',
    cursor: 'pointer',
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
    paddingTop: '10px',
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
