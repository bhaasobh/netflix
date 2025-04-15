import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';


import config from '../config';
import MoreInfoCover from './MoreInfoCover';

const MoreInfoModal = ({ show, onClose, movie }) => {
  const { mediaType } = useAuth();

  const [episodes, setEpisodes] = useState([]);

  const [images, setImages] = useState([]);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    if (!movie?.id) return;
  
    const fetchExtras = async () => {
      try {
        const imgRes = await fetch(`${config.TMDB_API}/${mediaType}/${movie.id}/images`, {
          headers: {
            accept: 'application/json',
            Authorization: `${config.Authorization}`,
          },
        });
        const imgJson = await imgRes.json();
        setImages(imgJson.backdrops.slice(0, 3));
  
        const creditRes = await fetch(`${config.TMDB_API}/${mediaType}/${movie.id}/credits`, {
          headers: {
            accept: 'application/json',
            Authorization: `${config.Authorization}`,
          },
        });
        const creditJson = await creditRes.json();
        setCast(creditJson.cast.slice(0, 5));
  
        if (mediaType === 'tv') {
          const seasonRes = await fetch(`${config.TMDB_API}/tv/${movie.id}/season/1`, {
            headers: {
              accept: 'application/json',
              Authorization: `${config.Authorization}`,
            },
          });
          const seasonJson = await seasonRes.json();
          setEpisodes(seasonJson.episodes || []);
        }
      } catch (err) {
        console.error('Failed to load extra info:', err);
      }
    };
  console.log("eposide : ",episodes);
    fetchExtras();
  }, [movie, mediaType]);
  

  if (!show || !movie) return null;

  return (
    <div style={styles.backdrop} onClick={onClose}>
     
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <MoreInfoCover movie={movie}/>
        <button style={styles.closeBtn} onClick={onClose}>✖</button>
        

        <p>{movie.overview}</p>
        {mediaType !== 'movie' && (
  <>
    {episodes.length > 0 && (
      <div>
        <h3>Episodes</h3>
        {episodes.map((ep) => (
          <div key={ep.id} style={styles.episodeBox}>
            <div style={styles.index}>{ep.episode_number}</div>
            <img
              src={`${config.TMDB_IMAGE}/${ep.still_path}`}
              alt={ep.name}
              style={styles.thumbnail}
            />
            <div style={styles.episodeInfo}>
              <div style={styles.header}>
                <h4 style={styles.title}>{ep.name}</h4>
                <span style={styles.duration}>
                  {ep.runtime ? `${ep.runtime}m` : '—'}
                </span>
              </div>
              <p style={styles.overview}>{ep.overview}</p>
            </div>
          </div>
        ))}
      </div>
    )}

    {images.length > 0 && (
      <div>
        <h3>Scenes</h3>
        <div style={styles.gallery}>
          {images.map((img, idx) => (
            <img
              key={idx}
              src={`https://image.tmdb.org/t/p/w300${img.file_path}`}
              alt={`scene ${idx}`}
              style={styles.image}
            />
          ))}
        </div>
      </div>
    )}
  </>
)}

{/* ✅ cast.map מחוץ לבלוק התנאי */}
{cast.length > 0 && (
  <div>
    <h3>Cast</h3>
    <ul>
      {cast.map((person, idx) => (
        <li key={idx}>
          {person.name} as {person.character}
        </li>
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    width: '850px',
    maxHeight: '100vh',
    overflowY: 'auto',
    backgroundColor: 'black',
    color: 'white', // תיקון הצבע
    padding: '20px',
    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
    borderRadius: '8px',
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '24px',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    color: 'white', // להבטיח שנראה אותו על רקע שחור
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
  },
  episodeBox: {
    display: 'flex',
    backgroundColor: '#1c1c1c',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '12px',
    gap: '10px',
    alignItems: 'flex-start',
  },
  index: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'white',
    width: '30px',
    textAlign: 'center',
    marginTop: '8px',
  },
  thumbnail: {
    width: '120px',
    height: '70px',
    borderRadius: '4px',
    objectFit: 'cover',
  },
  episodeInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: '16px',
    margin: 0,
  },
  duration: {
    fontSize: '14px',
    color: '#aaa',
  },
  overview: {
    fontSize: '14px',
    color: '#ccc',
    marginTop: '5px',
  },
};


export default MoreInfoModal;
