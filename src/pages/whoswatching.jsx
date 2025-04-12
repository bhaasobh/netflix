import React, { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import '../css/WhoIsWatching.css';
import config from '../config'; 
import { useAuth } from '../context/AuthContext';




const WhoIsWatching = () => {
  const { user } = useAuth(); 
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    if (Array.isArray(user?.profiles)) {
      setProfiles(user.profiles);
    } else {
      setProfiles([]); 
    }
    console.log('user:', user);
  console.log('user.profiles:', user?.profiles);
  }, [user]);

  const handleAddProfile = async () => {
    const name = prompt('Enter profile name:');
    if (!name) return;
  
    
    const usedNumbers = profiles.map(p => p.profilePhoto);
    
   
    let profileNumber = null;
    for (let i = 1; i <= 5; i++) {
      if (!usedNumbers.includes(i)) {
        profileNumber = i;
        break;
      }
    }
  
  
    if (!profileNumber) {
      alert('You can only have up to 5 profiles.');
      return;
    }
  
   
    const nextPhoto = ((profiles.length % 5) + 1);
  
    try {
      const res = await fetch(`${config.SERVER_API}/user/profiles/${user.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, profilePhoto: nextPhoto, profileNumber }),
      });
  
      const data = await res.json();
      setProfiles(data);
    } catch (err) {
      console.error('Failed to add profile:', err);
    }
  };
  
  
  

  return (
    <div className="watching-container">
      <span>Who’s watching?</span>
      <div className="profiles">
        {profiles.map((profile, i) => (
          <ProfileCard
          key={i}
          name={profile.name}
          profilePhoto={profile.profilePhoto}
          profileId={profile._id}
        />
        
        ))}
        {profiles.length < 5 && (

          <div className="add" onClick={handleAddProfile}>
            <ProfileCard
          
          name="Add Profile"
          profilePhoto={6}
        />
          
          
          </div>
        )}
      </div>
    </div>
  );
};

export default WhoIsWatching;
