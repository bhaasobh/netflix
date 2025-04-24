import React from 'react';

const modalStyles = {
  backdrop: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  modal: {
    backgroundColor: 'white',
    padding: '20px 30px',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#28a745',
  },
};

const SuccessModal = ({ show, message, onClose }) => {
    if (!show) return null;
  
    return (
      <div style={modalStyles.backdrop} onClick={onClose}>
        <div style={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
          {message}
        </div>
      </div>
    );
  };
  

export default SuccessModal;
