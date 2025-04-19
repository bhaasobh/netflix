import React ,{useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import config from '../config';
import SuccessModal from './SuccessModal';

import { useAuth } from '../context/AuthContext';

const MoreInfoCover = ({ movie }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
    const { user,profileID} = useAuth(); 
  console.log("movie ",movie);
  const navigate = useNavigate();

  const handleReview = () => {
    if (!user) {
      navigate('/SignIn'); 
    } else {
      navigate(`/Review/${movie.id}`);
    }
  };

  if (!movie) return null;
  

  const handleAddToList = async () => {
    try {
      const res = await fetch(`${config.SERVER_API}/profile-list/${user.id}/profile/${profileID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movie),
      });
  
      if (!res.ok) throw new Error('Failed to add');
  
      const data = await res.json();
  
      // Choose message based on `added` flag
      const name = movie.title || movie.name;
      const msg = data.added
        ? `✅ '${name}' was added successfully!`
        : `⚠️ '${name}' is already in your list.`;
  
      setModalMessage(msg);
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2000);
    } catch (err) {
      console.error(err);
      setModalMessage('❌ Error adding to list');
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2000);
    }
  };
  

  return (
    <div style={styles.container}>
      <img src={config.TMDB_IMAGE+'/'+movie.backdrop_path} alt={movie.title} style={styles.image} />

      <div style={styles.overlay}>
        <p style={styles.seriesLabel}>N SERIES</p>
        <h1 style={styles.title}>{movie.title}</h1>

        <div style={styles.buttons}>
          <button style={styles.reviewButton} onClick={handleReview}>
            <FaPlay style={{ marginRight: '5px' }} />
            Review
          </button>
          <button style={styles.addButton} onClick={handleAddToList}>
            <IoMdAdd size={24} />
          </button>
          <SuccessModal
  show={showModal}
  message={modalMessage}
  onClose={() => setShowModal(false)}
/>

          
          
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    backgroundColor:'black',
    width: '100%',
    height: '430px',
    overflow: 'hidden',
    borderRadius: '10px',
    marginBottom: '20px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    color: '#fff',
  },
  seriesLabel: {
    fontSize: '12px',
    letterSpacing: '2px',
    color: '#e50914',
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    margin: '10px 0',
  },
  buttons: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
  },
  reviewButton: {
    width: '119px',
    height: '43px',
    gap: '10px',
    backgroundColor: '#fff',
    color: '#000',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 15px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#333',
    width:'40px',
    height:'40px',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    padding: '7px',
    cursor: 'pointer',
  }
};

export default MoreInfoCover;
