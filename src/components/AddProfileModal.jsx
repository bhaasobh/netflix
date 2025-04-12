import React, { useState } from 'react';
import './AddProfileModal.css';

const AddProfileModal = ({ onClose, onSave, existingNames }) => {
  const [name, setName] = useState('');

  const handleSave = () => {
    const trimmed = name.trim();
    if (!trimmed) return alert('Profile name cannot be empty');
    if (existingNames.includes(trimmed.toLowerCase()))
      return alert('A profile with that name already exists');

    onSave(trimmed);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Create Profile</h2>
        <input
          type="text"
          placeholder="Enter profile name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="modal-buttons">
          <button onClick={handleSave}>Save</button>
          <button className="cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddProfileModal;
