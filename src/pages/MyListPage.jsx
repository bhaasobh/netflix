import React, { useState, useEffect } from 'react';
import config from '../config';
import { useAuth } from '../context/AuthContext';
import HomeCover from '../components/HomeCover';
import RowComponent from '../components/RowComponent';
import { BiColor } from 'react-icons/bi';
import Footer from '../components/Footer';

const ITEMS_PER_PAGE = 12;

const MyListPage = () => {
  const { user , profileID } = useAuth();
  const [myList, setMyList] = useState([]);
  const [visibleItems, setVisibleItems] = useState([]);
  const [page, setPage] = useState(1);
const [CoverList, setCoverList] = useState([]);
  const [profile, setProfile] = useState(null); 

  const chunkArray = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );
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
      if (profileID) {
        fetchProfile(profileID);
      }
    }, [profileID]);
  useEffect(() => {
    const fetchList = async () => {
     
      try {
        const res = await fetch(`${config.SERVER_API}/profile-list/${user.id}/profile/${profileID}`);
        if (!res.ok) throw new Error('Failed to fetch list');
        const data = await res.json();
        
        setMyList(data);
        
        setCoverList(data.slice(0,4));

      } catch (err) {
        console.error('Error fetching profile list:', err);
      }
    };

    if (user?.id && profileID) fetchList();
  }, [user?.id, profileID],);

  useEffect(() => {
 
  }, [CoverList]);

  // Pagination (infinite scroll)
  useEffect(() => {
    const nextItems = myList.slice(0, page * ITEMS_PER_PAGE);
    setVisibleItems(nextItems);
  }, [page, myList]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 50 >=
      document.documentElement.offsetHeight
    ) {
      if (page * ITEMS_PER_PAGE < myList.length) {
        setPage(prev => prev + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page, myList]);
  const chunks = chunkArray(myList, 10);  
  return (
    <div style={styles.background}>
      
      <HomeCover profile={profile} movies={myList} activeLink="list"/>
      <h1 style={styles.Rowtitle}>My List</h1>
      {chunks.map((chunk, index) => (
        <RowComponent key={index} list={chunk} />
      ))}
      <Footer/>
    </div>
  );
  
};

export default MyListPage;

const styles = {
  background: {
    background: 'black',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    minHeight: '100vh',
    color: 'white'
  },
  Rowtitle: {
    color: 'white',
    padding: '10px 20px'
  },
};

