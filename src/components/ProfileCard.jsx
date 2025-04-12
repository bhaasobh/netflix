import React from 'react';
import '../css/WhoIsWatching.css';

const ProfileCard = ({ name, quantity }) => {
  return (
    <div className="profile-card">
      <div className="face">😊</div>
      <p>{name}</p>
      <span>{quantity} shows</span>
    </div>
  );
};

export default ProfileCard;
