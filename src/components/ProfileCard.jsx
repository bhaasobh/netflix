import React, { useEffect, useState } from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom'; // ⬅️ add this at the top
import config from '../config';
import { useAuth } from '../context/AuthContext';

const ProfileCard = ({ name, profilePhoto, userId, profileId, refreshProfiles }) => {
  const [avatar, setAvatar] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);
  const { setProfileID } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    const getAvatarByName = async (name) => {
      try {
        const res = await fetch(`${config.SERVER_API}/avatar/${name}`);
        if (!res.ok) throw new Error('Avatar not found');
        const avatarData = await res.json();
        setAvatar(avatarData);
      } catch (err) {
        console.error('Failed to fetch avatar by name:', err);
      }
    };

    if (profilePhoto !== 6) {
      getAvatarByName(profilePhoto);
    }
  }, [profilePhoto]);

  const handleDelete = async () => {

    if (!userId || !profileId) return;
    const confirm = window.confirm("Are you Sure you want to delete this profile ?");
    if (!confirm) return;

    try {
      await fetch(`${config.SERVER_API}/user/profiles/${userId}/${profileId}`, {
        method: 'DELETE',
      });
      refreshProfiles?.();
    } catch (err) {
      console.error('Failed to delete profile:', err);
    }
  };

  const handleNameClick = () => setIsEditing(true);
  const handleChange = (e) => setNewName(e.target.value);

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      await saveName();
    }
  };

  const saveName = async () => {
    if (!newName.trim() || !userId || !profileId) return;
    try {
      await fetch(`${config.SERVER_API}/user/profiles/${userId}/${profileId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName.trim() }),
      });
      setIsEditing(false);
      refreshProfiles?.();
    } catch (err) {
      console.error('Failed to update profile name:', err);
    }
  };

  const styles = {
    profileCard: {
      backgroundImage: avatar && profilePhoto !== 6 ? `url(${avatar.url})` : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: 'white',
      width: '144px',
      height: '144px',
      borderRadius: '10px',
      fontSize: '14px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      position: 'relative',
    },
    deleteIcon: {
      position: 'absolute',
      top: '5px',
      right: '5px',
      color: 'white',
      backgroundColor: 'rgba(0,0,0,0.4)',
      borderRadius: '50%',
      padding: '4px',
      cursor: 'pointer',
      zIndex: 10,
    },
    input: {
      fontSize: '14px',
      padding: '4px',
      borderRadius: '4px',
      border: '1px solid white',
      textAlign: 'center',
      marginTop: '8px',
    },
    name: {
      marginTop: '8px',
      cursor: 'pointer',
    }
  };

  return (
    <div>
      <div
  style={profilePhoto === 6 ? styles.profileCardAdd : styles.profileCard}
  onClick={() => {
    if (profilePhoto !== 6){
      setProfileID(profileId);
      navigate(`/Home`);
    } 
  }}
>

        {profilePhoto === 6 ? (
          <IoIosAddCircleOutline size={100} />
        ) : (
          <>
            <MdDelete
              size={20}
              style={styles.deleteIcon}
              onClick={(e) => {
                e.stopPropagation(); // prevent navigation
                handleDelete();
              }}
            />
            <div style={styles.face}></div>
          </>
        )}
      </div>

      <div>
        {isEditing ? (
          <input
            type="text"
            value={newName}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={saveName}
            autoFocus
            style={styles.input}
          />
        ) : (
          <p onClick={handleNameClick} style={styles.name}>{newName}</p>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
