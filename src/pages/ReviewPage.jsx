import React, { useEffect, useState } from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import config from '../config';

const ReviewPage = () => {
  const { mediaId } = useParams();
  const { user , mediaType } = useAuth();
  const [text, setText] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);


    const [media, setMedia] = useState([]);

    const navigate = useNavigate();

const handleGoHome = () => {
  navigate('/Home');
};

  
    const fetchMedia  = async () => {
        const url =
          mediaType === 'movie'
            ? `${config.TMDB_API}/movie/${mediaId}`
            : `${config.TMDB_API}/tv/${mediaId}`;
      
            console.log(url);
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `${config.Authorization}`,
          },
        };
      
        try {
          const res = await fetch(url, options);
          const json = await res.json();
          console.log("json",json);
          setMedia(json);
        } catch (err) {
          console.error('Error fetching media:', err);
        }
      };
      


  useEffect(() => {
    fetchReviews();
    fetchMedia();
    console.log("media",mediaId);
    console.log("user :",user.id);
    console.log("media details" , media);
  }, [mediaId, user,media]);

  const fetchReviews = async () => {
    try {
      const [publicRes, userRes] = await Promise.all([
        fetch(`${config.SERVER_API}/reviews/public/${mediaId}`),
        fetch(`${config.SERVER_API}/reviews/user/${user?.id}`)
      ]);

      const publicData = await publicRes.json();
      const userData = await userRes.json();

      const filteredUserReviews = userData.filter(r => r.mediaId === mediaId);
      setReviews([...publicData, ...filteredUserReviews]);
    } catch (err) {
      console.error('Error loading reviews:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${config.SERVER_API}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          mediaId,
          text,
          isPublic,
          rating
        }),
      });

      if (!res.ok) throw new Error('Failed to submit review');
      setText('');
      setIsPublic(false);
      setRating(0);
      fetchReviews(); 
    } catch (err) {
      console.error('Error submitting review:', err);
    }
  };

  const renderStars = (count) =>
    [...Array(5)].map((_, i) => (
      <span key={i} style={{ color: i < count ? '#FFD700' : '#ccc' }}>★</span>
    ));

  const ReviewCard = ({ review }) => (
    <div style={styles.reviewBox}>
      <div style={styles.header}>
        <span style={styles.username}>
          {review.isPublic ? user.email :"non"}
        </span>
        <span>{renderStars(review.rating)}</span>
      </div>
      <p>{review.text}</p>
    </div>
  );

  return (
    <div  style={styles.ReviewPage}>
    <div style={styles.container}>
      <h2>review for "{media.title||media.original_name}"</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your Review"
          rows={4}
          style={styles.textarea}
          required
        />
        <div style={styles.section}>
          <label>
            <input
              type="radio"
              checked={!isPublic}
              onChange={() => setIsPublic(false)}
            />
            Private
          </label>
          <label style={{ marginInlineStart: '15px' }}>
            <input
              type="radio"
              checked={isPublic}
              onChange={() => setIsPublic(true)}
            />
            Puplic
          </label>
        </div>
        <div style={styles.section}>
          Rating :
          <div>{renderStars(rating)}</div>
        </div>
        <div style={styles.section}>
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setRating(i)}
              style={i === rating ? styles.starBtnActive : styles.starBtn}
            >
              {i}
            </button>
          ))}
        </div>
        <button type="submit" style={styles.submitBtn}>Send your review</button>
      </form>

      <h3 style={{ marginTop: '30px' }}>Review history</h3>
      {reviews.filter(r => r.isPublic).length > 0 ? (
  reviews
    .filter(r => r.isPublic)
    .map(r => <ReviewCard key={r._id} review={r} />)
) : (
  <p>no public reviews yet</p>
)}
<button onClick={handleGoHome} style={styles.backBtn}>
  Return Home
</button>
    </div>
    

    </div>
  );
};

const styles = {
    backBtn: {
        margin: '20px auto',
        padding: '10px 20px',
        backgroundColor: '#444',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'block',
      }
,      
    ReviewPage: {
        backgroundColor: 'black',
        height: '100%', 
      },      
  container: {
    padding: '20px',
    maxWidth: '700px',
    margin: 'auto',
    direction: 'ltr',
    fontFamily: 'inherit',
    
    color:'white'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  textarea: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    resize: 'vertical',
  },
  section: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  submitBtn: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  reviewBox: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    marginTop: '10px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '6px',
  },
  username: {
    fontWeight: 'bold',
  },
  starBtn: {
    padding: '6px 10px',
    border: '1px solid #aaa',
    borderRadius: '6px',
    backgroundColor: '#eee',
    cursor: 'pointer',
  },
  starBtnActive: {
    padding: '6px 10px',
    border: '1px solid #007bff',
    borderRadius: '6px',
    backgroundColor: '#cce5ff',
    cursor: 'pointer',
  },
};

export default ReviewPage;
