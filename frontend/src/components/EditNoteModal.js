import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/EditNoteModal.css'; // Assume some basic styling for the modal

const EditNoteModal = ({ note, closeModal, fetchNotes }) => {
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);
  const [category, setCategory] = useState(note.category);
  const [isPrivate, setIsPrivate] = useState(note.isPrivate);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/notes/${note._id}`, {
        title,
        description,
        category,
        isPrivate,
      });
      closeModal();
      fetchNotes(); // Refresh the notes list after editing
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Note</h2>
        Title
        <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        Description
        <textarea 
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
        <div className="form-group">
          Category:
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
        </div>
        Visibility
        <select 
          value={isPrivate} 
          onChange={(e) => setIsPrivate(e.target.value === 'true')}
        >
          <option value="false">Public</option>
          <option value="true">Private</option>
        </select>
        <button onClick={handleSave} className="save-button">Save</button>
        <button onClick={closeModal} className="cancel-button">Cancel</button>
      </div>
    </div>
  );
};

export default EditNoteModal;
