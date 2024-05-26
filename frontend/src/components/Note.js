import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import EditNoteModal from './EditNoteModal';
import '../styles/Note.css';

const Note = ({ note, triggerRefresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${note._id}`);
      triggerRefresh();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    triggerRefresh();
  };

  return (
    <div className="note-container">
      <div className="note-header">
        <h2 className="note-title">{note?.title}</h2>
        <div className="note-actions">
          <button className="icon-button" onClick={handleEditClick}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className="icon-button" onClick={handleDeleteClick}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
      <p className="note-description">{note?.description}</p>
      <div className="note-meta">
        <span className="note-category">{note?.category}</span>
      </div>

      {isModalOpen && (
        <EditNoteModal 
          note={note} 
          closeModal={handleCloseModal} 
          triggerRefresh={triggerRefresh} 
        />
      )}
    </div>
  );
};

export default Note;
