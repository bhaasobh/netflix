import React, { useState ,useEffect} from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import RowComponent from '../components/RowComponent';
import HomeCover from '../components/HomeCover';
import Footer from '../components/Footer';


const Home = () => {
  const { user, logout } = useAuth();
  const { profileID,setprofileID } = useAuth();
  console.log("profile ",profileID);
  
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [profile, setProfile] = useState(null); 

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


  return (
    <div style={styles.background}>
      <HomeCover profile={profile}/>
      <RowComponent title={"AI"}/>
      <RowComponent title={"10 Most New"}/>
      <RowComponent title={"10 Most watched in Israel"}/>
      <RowComponent title={"10 Rated for this user "+profile?.name}/>
      <RowComponent title={"ANIME"}/>
      <RowComponent title={"Castom Row"}/>
      <RowComponent title={"My List"}/>
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


