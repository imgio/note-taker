import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddCategoryButton.css';

const AddCategoryButton = ({ fetchCategories }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  const handleAddCategory = async () => {
    try {
      await axios.post('http://localhost:5000/api/categories', { name: categoryName });
      setIsModalOpen(false);
      setCategoryName('');
      fetchCategories(); // Fetch the updated list of categories
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <div>
      <button className="add-category-button" onClick={() => setIsModalOpen(true)}>
        + Add Category
      </button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Category</h2>
            <input
              type="text"
              placeholder="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <button className="add-button" onClick={handleAddCategory}>
              Add
            </button>
            <button className="close-button" onClick={() => setIsModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCategoryButton;
