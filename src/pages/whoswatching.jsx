import React, { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import '../css/WhoIsWatching.css';
import config from '../config'; // your SERVER_API URL
import { useAuth } from '../context/AuthContext';

const WhoIsWatching = () => {
  const { user } = useAuth(); // נניח שאתה שומר את המשתמש המחובר כאן
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    console.log("bahaa sobeh");
    setProfiles(user.profiles);
  }, [user]);

  const handleAddProfile = async () => {
    const name = prompt('Enter profile name:');
    if (!name) return;

    try {
      const res = await fetch(`${config.SERVER_API}/user/profiles/${user.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();
      setProfiles(data);
    } catch (err) {
      console.error('Failed to add profile:', err);
    }
  };

  return (
    <div className="watching-container">
      <h1>Who’s watching?</h1>
      <div className="profiles">
        {profiles.map((profile, i) => (
          <ProfileCard key={i} name={profile.name} quantity={profile.showCount} />
        ))}
        {profiles.length < 5 && (
          <div className="profile-card add" onClick={handleAddProfile}>
            <div className="plus">＋</div>
            <p>Add Profile</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhoIsWatching;
