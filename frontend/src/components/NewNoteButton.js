import React from 'react';
import '../styles/BlueButton.css';

const NewNoteButton = ({ onClick }) => {
  return (
    <button className="blue-button" onClick={onClick}>
      + New Note
    </button>
  );
};

export default NewNoteButton;