// src/components/NoteModal.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/NoteModal.css';

const NoteModal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
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

  if (!isOpen) return null;

  const handleSave = () => {
    const note = {
      title,
      description,
      category,
      isPrivate,
    };
    onSave(note);
    setTitle('');
    setDescription('');
    setCategory('');
    setIsPrivate(false);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <div className="center-items">
            <h2>Create a New Note</h2>
        </div>
        <div className="form-group">
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
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
        <div className="form-group">
          <label>Visibility</label>
          <select value={isPrivate ? "private" : "public"} onChange={(e) => setIsPrivate(e.target.value === 'private')}>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <div className="center-items">
            <button type="button" onClick={handleSave}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
