import React, { useState ,useEffect} from 'react';
import { useAuth } from '../context/AuthContext';
import config from '../config';
import RowComponent from '../components/RowComponent';
import HomeCover from '../components/HomeCover';
import Footer from '../components/Footer';

const GENRES = {
  Action: 28,
  Comedy: 35,
  Drama: 18,
  Horror: 27,
  Animation: 16,
};

const Home = () => {
  const { user, profileID,mediaType } = useAuth();
  

  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ReviewmediaList, setReviewMediaList] = useState([]);
  const [profile, setProfile] = useState(null); 
const [comedyList, setComedyList] = useState([]);


  const uniqueById = (array) => {
    const map = new Map();
    array.forEach(item => {
      if (!map.has(item.id)) {
        map.set(item.id, item);
      }
    });
    return Array.from(map.values());
  };


  const fetchProfile = async (profileID) => {
    try {
      const res = await fetch(`${config.SERVER_API}/user/profiles/${user.id}/${profileID}`);
      if (!res.ok) throw new Error('Failed to fetch profile');
      const profileData = await res.json();
      setProfile(profileData);
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };
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
      .then(json => setMovies(json.results.slice(0, 4))) 
      .catch(err => console.error(err));
  }, []);
  
  useEffect(() => {
    if (profileID) {
      fetchProfile(profileID);
    }
  }, [profileID]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
const backgroundImage = movies[currentIndex]?.backdrop_path
? `${config.TMDB_IMAGE}/${movies[currentIndex].backdrop_path}`
: '';
const fetchByGenre = async (genreId, type = 'movie') => {
  const url = `${config.TMDB_API}/discover/${type}?with_genres=${genreId}&language=en-US&page=1`;

  const res = await fetch(url, {
    headers: {
      accept: 'application/json',
      Authorization: config.Authorization,
    },
  });

  const data = await res.json();
  return data.results;
};
useEffect(() => {
  const fetchReviewedMedia = async () => {
    try {
      const res = await fetch(`${config.SERVER_API}/reviews/user/${user.id}`);
      const reviews = await res.json();

      const fullMediaData = await Promise.all(
        reviews.map(async (review) => {
          const type = review.mediaId.startsWith('tv_') ? 'tv' : 'movie';
          const cleanId = review.mediaId.replace(/^(tv_|movie_)/, '');

          const mediaRes = await fetch(`${config.TMDB_API}/${type}/${cleanId}`, {
            headers: {
              accept: 'application/json',
              Authorization: config.Authorization,
            }
          });

          return await mediaRes.json();
        })
      );

      
     
      const uniqueMedia = uniqueById(fullMediaData); // ✅ remove duplicates
      setReviewMediaList(uniqueMedia);
      
    } catch (err) {
      console.error('Error fetching reviewed media:', err);
    }


  };

  if (user?.id) fetchReviewedMedia();
}, [user]);

useEffect(() => {
   
  let url;
 
if (mediaType === 'movie') {
url = `${config.TMDB_API}/movie/top_rated?language=en-US&page=1`;
} else if (mediaType === 'tv') {
url = `${config.TMDB_API}/tv/top_rated?language=en-US&page=1`;
} else if (mediaType === 'mylist') {
url = `${config.SERVER_API}/user/profiles/${user.id}/${profileID}`;
} else {
url = null;
}


  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `${config.Authorization}`,
    },
  };
if(url){
  fetch(url, options)
    .then(res => res.json())
    .then(json => {
      if (mediaType === 'mylist') {
        setMovies((json.myList || []).slice(0, 4));
      } else {
        setMovies((json.results || []).slice(0, 4));
      }
      
    })
    .catch(err => console.error(err));
}
}, [mediaType]);


useEffect(() => {
  const fetchMediaByType = async (type) => {
    try {
      const res = await fetch(`${config.SERVER_API}/media?type=${type}`);
      const data = await res.json();
      setMovies((prev) => [...prev, ...data]); // או החלף `setMovies` לפי הצורך
    } catch (err) {
      console.error('Error fetching media by type:', err);
    }
  };

  const getData = async () => {
    let data = [];
  
    if (mediaType === 'tv') {
      data = await fetchByGenre(GENRES.Comedy, 'tv');
    } else {
      data = await fetchByGenre(GENRES.Comedy, 'movie');
    }
  
    setComedyList(data);
  };
  

  getData();
  fetchMediaByType("movie");
  
}, [mediaType]);


  return (
    <div style={styles.background}>
      <HomeCover profile={profile} movies={movies} />
      <RowComponent title={"10 Top Rated"}/>
      <RowComponent title={"10 Most popular"} category={"popular"}/>
      <RowComponent title={"My Reviewed List"} list={ReviewmediaList} />
      <RowComponent title={"Comedy"} list={comedyList}/>
   
      <Footer/>
    </div>
   
  );
};

export default Home;
const styles = {
  
  background: {
    background:'red',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '400px'
  }
};


