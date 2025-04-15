import React from 'react';
import { useNavigate } from 'react-router-dom';

const MoreInfoModal = ({ show, onClose, movie }) => {
  const navigate = useNavigate();

  if (!show || !movie) return null;

  return (
    <div style={styles.backdrop} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeBtn} onClick={onClose}>✖</button>

        <h1>{movie.title}</h1>
        
        <div style={styles.actions}>
          <button onClick={() => console.log('Add to watchlist')}>➕</button>
          <button onClick={() => navigate(`/review/${movie.id}`)}>📝 Review</button>
        </div>

        <p>{movie.overview}</p>

        {movie.episodes && movie.episodes.length > 0 && (
          <div>
            <h3>Episodes</h3>
            <ul>
              {movie.episodes.map((ep, idx) => (
                <li key={idx}>{ep.title}</li>
              ))}
            </ul>
          </div>
        )}

        {movie.images && movie.images.length >= 3 && (
          <div style={styles.gallery}>
            {movie.images.slice(0, 3).map((img, idx) => (
              <img key={idx} src={img} alt={`Scene ${idx}`} style={styles.image} />
            ))}
          </div>
        )}

        {movie.cast && (
          <div>
            <h3>Cast & Crew</h3>
            <ul>
              {movie.cast.map((person, idx) => (
                <li key={idx}>{person.name} – {person.role}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    zIndex: 1000,
  },
  modal: {
    width: '40vw',
    maxHeight: '100vh',
    overflowY: 'auto',
    backgroundColor: 'white',
    color: 'black',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
    borderRadius: '8px 0 0 8px',
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: '18px',
    cursor: 'pointer',
  },
  actions: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  gallery: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
  },
  image: {
    width: '100px',
    borderRadius: '4px',
  }
};

export default MoreInfoModal;
