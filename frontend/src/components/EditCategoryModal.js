import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/EditCategoryModal.css';

const EditCategoryModal = ({ category, closeModal }) => {
  const [name, setName] = useState(category.name);

  const handleSaveCategory = async () => {
    try {
      await axios.put(`http://localhost:5000/api/categories/${category._id}`, { name });
      closeModal();
    } catch (error) {
      console.error('Error saving category:', error);
    }
  }; 

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 style={{ textAlign: 'center' }}>Edit Category</h2>
        <label>
          Category Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <button onClick={handleSaveCategory} style={{ display: 'block', margin: '0 auto', width: '50%' }}>Save</button>
      </div>
    </div>
  );
};

export default EditCategoryModal;
