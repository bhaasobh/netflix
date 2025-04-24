import React, { useState } from 'react';
import config from '../config';

const AddMediaForm = ({ show, onClose }) => {
  const [title, setTitle] = useState('');
  const [mediaType, setMediaType] = useState('movie');
  const [posterPath, setPosterPath] = useState('');
  const [backdropPath, setBackdropPath] = useState('');
  const [overview, setOverview] = useState('');
  const [message, setMessage] = useState('');

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      media_type: mediaType,
      poster_path: posterPath,
      backdrop_path: backdropPath,
      overview,
    };

    try {
      const res = await fetch(`${config.SERVER_API}/add-media`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Media added successfully!');
        setTitle('');
        setPosterPath('');
        setBackdropPath('');
        setOverview('');

        // Optional: auto-close modal after delay
        setTimeout(() => {
          setMessage('');
          onClose();
        }, 1000);
      } else {
        setMessage(data.message || 'Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Server error.');
    }
  };

  return (
    <div style={styles.backdrop} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeBtn} onClick={onClose}>✖</button>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.title}>Add Movie or Series</h2>
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required style={styles.input} />
          <select value={mediaType} onChange={(e) => setMediaType(e.target.value)} style={styles.input}>
            <option value="movie">Movie</option>
            <option value="tv">Series</option>
          </select>
          <input type="text" placeholder="Poster Path" value={posterPath} onChange={(e) => setPosterPath(e.target.value)} style={styles.input} />
          <input type="text" placeholder="Backdrop Path" value={backdropPath} onChange={(e) => setBackdropPath(e.target.value)} style={styles.input} />
          <textarea placeholder="Overview" value={overview} onChange={(e) => setOverview(e.target.value)} style={{ ...styles.input, height: '100px' }} />
          <button type="submit" style={styles.button}>Add</button>
          {message && <p style={styles.message}>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddMediaForm;


const styles = {
  form: {
    maxWidth: '500px',
    margin: '20px auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#e50914',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
  message: {
    color: 'lime',
    fontWeight: 'bold',
  },
  title: {
    textAlign: 'center',
    color: '#fff'
  },
  backdrop: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#1e1e1e',
    padding: '20px',
    borderRadius: '10px',
    width: '90%',
    maxWidth: '500px',
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: '10px',
    right: '15px',
    background: 'transparent',
    border: 'none',
    fontSize: '20px',
    color: '#fff',
    cursor: 'pointer',
  },

};
