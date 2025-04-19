import React, { useEffect, useState } from 'react';
import HeaderHome from './HeaderHome';
import config from '../config';
import MoreInfoModal from './MoreInfoModal';
import { useAuth } from '../context/AuthContext';


const HomeCover = ({ profile , movies , activeLink}) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showMoreInfoModal, setShowMoreInfoModal] = useState(false);
const [selectedMovie, setSelectedMovie] = useState(null);
const { mediaType ,user,profileID} = useAuth();

const handleMoreInfo = (movie) => {
  setSelectedMovie(movie);
  setShowMoreInfoModal(true);
};



  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.sliderContainer}>
    <HeaderHome profile={profile} wantedPage={activeLink} />
    <div
      style={{
        ...styles.sliderWrapper,
        width: `${movies.length * 100}%`,
        transform: `translateX(-${currentIndex * (100 / movies.length)}%)`,
      }}
    >
      {movies.map((movie, idx) => (
        <div
          key={idx}
          style={{
            ...styles.slide,
            backgroundImage: `url(${config.TMDB_IMAGE}/${movie.backdrop_path ||movie.poster_path})`,
          }}
          onClick={() => handleMoreInfo(movie)}
        />
      ))}
    </div>
  
   
    <div style={styles.overlay}>
      <div style={styles.badge}>N {mediaType === 'movie' ? 'MOVIES' : 'SERIES'}</div>
      <h1 style={styles.title}>{movies[currentIndex]?.title}</h1>
      <p style={styles.description}>{movies[currentIndex]?.overview}</p>
  
      <div style={styles.buttons}>
       
        <button style={styles.button} onClick={() => setShowModal(true)}>▶ Play</button>
  
        <button
          onClick={() => handleMoreInfo(movies[currentIndex])}
          style={{ ...styles.button, backgroundColor: '#6d6d6eb3' }}
        >
          ℹ More Info
        </button>
      </div>
    </div>
  
  
    {showModal && (
      <div style={styles.modalBackdrop} onClick={() => setShowModal(false)}>
        <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <h2>{movies[currentIndex]?.title}</h2>
          <p>{movies[currentIndex]?.overview}</p>
          <button onClick={() => setShowModal(false)} style={styles.closeButton}>✖ סגור</button>
        </div>
      </div>
    )}
  
    
    <MoreInfoModal
      show={showMoreInfoModal}
      onClose={() => setShowMoreInfoModal(false)}
      movie={selectedMovie}
    />
  </div>
  )  
};

const styles = {
    modalBackdrop: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      },
      modalContent: {
        backgroundColor: 'white',
        color: 'black',
        padding: '30px',
        borderRadius: '10px',
        maxWidth: '500px',
        width: '90%',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
        position: 'relative',
      },
      closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        border: 'none',
        background: 'transparent',
        fontSize: '20px',
        cursor: 'pointer',
      },
      
  sliderContainer: {
    position: 'relative',
    width: '100%',
    height: '80vh',
    overflow: 'hidden',
    color: 'white',
    backgroundColor: 'black'
  },
  sliderWrapper: {
    display: 'flex',
    transition: 'transform 1s ease-in-out',
    height: '100vh',
  },
  
  slide: {
    minWidth: '100vw',
    height: '100vh',
    backgroundSize: 'contain', // or 'cover', 'auto' as needed
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  
  overlay: {
    position: 'absolute',
    top: '30%',
    left: '40px',
    zIndex: 10,
    maxWidth: '40%',
    textShadow: '0 0 8px rgba(0,0,0,0.7)',
  },
  badge: {
    fontSize: '14px',
    letterSpacing: '3px',
    fontWeight: '600',
    color: 'red',
    marginBottom: '10px',
  },
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
  },
  description: {
    fontSize: '16px',
    lineHeight: '1.5',
    marginBottom: '20px',
  },
  buttons: {
    display: 'flex',
    gap: '10px',
  },
  button: {
    backgroundColor: 'white',
    color: 'black',
    border: 'none',
    padding: '10px 20px',
    fontWeight: 'bold',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default HomeCover;
