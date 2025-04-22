import React, { useEffect, useRef, useState } from 'react';
import config from '../config';
import MoreInfoModal from './MoreInfoModal';

import { useAuth } from '../context/AuthContext';

const styles = {
  section: {
    padding: '20px 40px',
    backgroundColor: 'black',
  },
  title: {
    color: 'white',
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '10px',
  },
  row: {
    display: 'flex',
    overflowX: 'scroll',
    gap: '10px',
    scrollbarWidth: 'none', // Firefox
  },
  card: {
    position: 'relative',
    minWidth: '200px',
    height: '115px',
    borderRadius: '4px',
    overflow: 'hidden',
    cursor: 'pointer',
    flexShrink: 0,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  badge: {
    position: 'absolute',
    bottom: '5px',
    left: '5px',
    backgroundColor: '#e50914',
    color: 'white',
    fontSize: '12px',
    fontWeight: 'bold',
    padding: '2px 6px',
    borderRadius: '2px',
  },
  top10: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    backgroundColor: '#e50914',
    color: 'white',
    fontSize: '10px',
    fontWeight: 'bold',
    padding: '2px 4px',
    borderRadius: '2px',
  }
};

const RowComponent = ({title,list=null,category='top_rated'}) => {
  const { mediaType } = useAuth();
  const rowRef = useRef(null);
  const [media,setMedia] = useState();
  const [showMoreInfoModal, setShowMoreInfoModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);


  useEffect(() => {
    const fetchMedia = async () => {
      const movieUrl = `${config.TMDB_API}/movie/${category}?language=en-US&page=1`;
      const tvUrl = `${config.TMDB_API}/tv/${category}?language=en-US&page=1`;
  
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `${config.Authorization}`,
        },
      };
  
      try {
        if (mediaType === 'movie' || mediaType === 'tv') {
          const url = mediaType === 'movie' ? movieUrl : tvUrl;
          const res = await fetch(url, options);
          const json = await res.json();
          setMedia(json.results);
        } else if (mediaType === 'all') {
          const [movieRes, tvRes] = await Promise.all([
            fetch(movieUrl, options),
            fetch(tvUrl, options),
          ]);
          const [movieJson, tvJson] = await Promise.all([
            movieRes.json(),
            tvRes.json(),
          ]);
  
          const combined = [...movieJson.results, ...tvJson.results];
          const shuffled = combined.sort(() => Math.random() - 0.5);
  
          setMedia(shuffled);
        }
      } catch (err) {
        console.error('Error fetching media:', err);
      }
    };

    if(!list)
    {
      fetchMedia();
    }else
    {
      setMedia(list);
      console.log(list);
    }
    
  }, [mediaType,list]);
  

  useEffect(() => {
    const slider = rowRef.current;
    let isDown = false;
    let startX;
    let scrollLeft;

    const mouseDown = (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const mouseLeave = () => {
      isDown = false;
      slider.classList.remove('active');
    };

    const mouseUp = () => {
      isDown = false;
      slider.classList.remove('active');
    };

    const mouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; 
      slider.scrollLeft = scrollLeft - walk;
    };

 
    slider.addEventListener('mousedown', mouseDown);
    slider.addEventListener('mouseleave', mouseLeave);
    slider.addEventListener('mouseup', mouseUp);
    slider.addEventListener('mousemove', mouseMove);

 
    return () => {
      slider.removeEventListener('mousedown', mouseDown);
      slider.removeEventListener('mouseleave', mouseLeave);
      slider.removeEventListener('mouseup', mouseUp);
      slider.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  return (
    <section style={styles.section}>
      <h2 style={styles.title}>{title} {list?.length}</h2>
      <div ref={rowRef} style={styles.row}>
        {media?.map((movie, index) => (
          <div
            key={movie.id}
            style={styles.card}
            onClick={() => {
              setShowMoreInfoModal(true);
              setSelectedMovie(movie);
            }}
          >
            <img
              src={`${config.TMDB_IMAGE}${movie.backdrop_path? movie.backdrop_path : movie.poster_path}`}
              alt={movie.title}
              style={styles.image}
            />
            <div style={styles.badge}>Top Rated</div>
            {index < 10 && <div style={styles.top10}>TOP 10</div>}
          </div>
        ))}
      </div>
  
      <MoreInfoModal
        show={showMoreInfoModal}
        onClose={() => setShowMoreInfoModal(false)}
        movie={selectedMovie}
      />
    </section>
  );
  
};

export default RowComponent;
