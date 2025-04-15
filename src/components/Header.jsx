import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={styles.header}>
      <Link to="/" style={styles.logo}>NETFLIX</Link>
    </header>
  );
};

export default Header;
const styles = {
  header: {
    width: '100%',
    maxWidth: '100%',
    height: '92px',
    padding: '24px 48px 28px',
    background: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    margin: '0 auto',
    boxSizing: 'border-box',
  },
  logo: {
    color: '#e50914',
    fontSize: '32px',
    fontWeight: 'bold',
    fontFamily: `'Helvetica Neue', Helvetica, Arial, sans-serif`,
    textDecoration: 'none',
  }
};

