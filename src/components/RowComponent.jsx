import React, { useEffect, useRef, useState } from 'react';
import config from '../config';

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

const RowComponent = ({title}) => {
  const [movies, setMovies] = useState([]);
  const rowRef = useRef(null);

  useEffect(() => {
    const url = `${config.TMDB_API}/movie/top_rated?language=en-US&page=1`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `${config.Authorization}`,
      },
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => setMovies(json.results))
      .catch(err => console.error(err));
  }, []);

  // Drag-to-scroll handlers
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
      const walk = (x - startX) * 2; // speed multiplier
      slider.scrollLeft = scrollLeft - walk;
    };

    // Attach mouse events
    slider.addEventListener('mousedown', mouseDown);
    slider.addEventListener('mouseleave', mouseLeave);
    slider.addEventListener('mouseup', mouseUp);
    slider.addEventListener('mousemove', mouseMove);

    // Cleanup
    return () => {
      slider.removeEventListener('mousedown', mouseDown);
      slider.removeEventListener('mouseleave', mouseLeave);
      slider.removeEventListener('mouseup', mouseUp);
      slider.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  return (
    <section style={styles.section}>
      <h2 style={styles.title}>{title}</h2>
      <div ref={rowRef} style={styles.row}>
        {movies.map((movie, index) => (
          <div key={movie.id} style={styles.card}>
            <img
              src={`${config.TMDB_IMAGE}${movie.backdrop_path}`}
              alt={movie.title}
              style={styles.image}
            />
            <div style={styles.badge}>Top Rated</div>
            {index < 10 && <div style={styles.top10}>TOP 10</div>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default RowComponent;
