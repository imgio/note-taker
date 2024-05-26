import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Note from '../components/Note';
import NewNoteButton from '../components/NewNoteButton';
import NoteModal from '../components/NoteModal';
import PlusIcon from '../components/PlusIcon';
import AddCategoryButton from '../components/AddCategoryButton';
import EditCategoryModal from '../components/EditCategoryModal';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import FiltersModal from '../components/FiltersModal';
import '../styles/Dashboard.css';


const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState('creationDate');
  const [searchQuery, setSearchQuery] = useState('');
  const [creationDateFrom, setCreationDateFrom] = useState('');
  const [creationDateTo, setCreationDateTo] = useState('');
  const [updateDateFrom, setUpdateDateFrom] = useState('');
  const [updateDateTo, setUpdateDateTo] = useState('');
  const [category, setCategory] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  const navigate = useNavigate(); // Use the useNavigate hook

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/notes', {
        params: {
          sort: sortOption,
          search: searchQuery,
          creationDateFrom,
          creationDateTo,
          updateDateFrom,
          updateDateTo,
          category, 
          selectedUsers
        },
      });
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
    fetchCategories();
    fetchUsers();
  }, [sortOption, searchQuery, creationDateFrom, creationDateTo, updateDateFrom, updateDateTo, category]);


  const applyFilters = () => {
    setIsFiltersModalOpen(false);
    fetchNotes();
  };

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setIsEditCategoryModalOpen(true);
  }; 

  const handleDeleteClickCategory = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${categoryId}`);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      if (error.response && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert('Error deleting category');
      }
    }
  };

  const handleCloseModal = () => {
    setIsEditCategoryModalOpen(false);
    setIsAddNoteModalOpen(false);
    setSelectedCategory(null);
    fetchCategories();
  };

  const handleOpenModal = () => {
    setIsAddNoteModalOpen(true);
  };

  const handleSaveNote = async (note) => {
    try {
      await axios.post('http://localhost:5000/api/notes', note);
      setIsAddNoteModalOpen(false);
      fetchNotes();
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    console.log('Selected sort option:', event.target.value);
    fetchNotes(event.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login'); // Navigate to dashboard
  };
  
  return (
    <div>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
        <div className="dashboard-heading">
            <h1>Notes</h1>  
        </div>
        <div className="dashboard-partition">
          <div className="dashboard-partition-left">
          <h1>Categories</h1>
              <ul className="category-list">
                {categories.map((category) => (
                  <li key={category._id} className="category-item">
                    {category.name}
                    <div className="float-right">
                      <FontAwesomeIcon icon={faEdit} className="edit-icon" onClick={() => handleEditClick(category)} />
                      {'  '}
                      <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={() => handleDeleteClickCategory(category._id)} />
                    </div>
                  </li>
                ))}
              </ul>
              <AddCategoryButton fetchCategories={fetchCategories} />
          </div>
          <div className="dashboard-partition-right">
            <div className="filters-container"> 
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-bar"
              />
              <button onClick={() => setIsFiltersModalOpen(true)} className="filters-button">Filters</button>
              <div className="sorting-container">
                <label htmlFor="sort">Sort by: </label>
                <select id="sort" value={sortOption} onChange={handleSortChange}>
                  <option value="creationDate">Creation Date</option>
                  <option value="updateDate">Update Date</option>
                  <option value="category">Category</option>
                  <option value="title">Title</option>
                </select>
              </div>
              <NewNoteButton onClick={handleOpenModal} />
            </div>
            <div className="notes-container">
              {notes.map((note) => (
                <Note key={note._id} note={note} triggerRefresh={fetchNotes} />
              ))}
            </div>
            <NoteModal isOpen={isAddNoteModalOpen} onClose={handleCloseModal} onSave={handleSaveNote} />
          </div>
          {isEditCategoryModalOpen && (
            <EditCategoryModal 
              category={selectedCategory} 
              closeModal={handleCloseModal} 
            />
          )}
          <FiltersModal
            isOpen={isFiltersModalOpen}
            onClose={() => setIsFiltersModalOpen(false)}
            sortOption={sortOption}
            setSortOption={setSortOption}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            creationDateFrom={creationDateFrom}
            setCreationDateFrom={setCreationDateFrom}
            setCreationDateTo={setCreationDateTo}
            creationDateTo={creationDateTo}
            updateDateFrom={updateDateFrom}
            setUpdateDateFrom={setUpdateDateFrom}
            updateDateTo={updateDateTo}
            setUpdateDateTo={setUpdateDateTo}
            category={category}
            setCategory={setCategory}
            categories={categories}
            applyFilters={applyFilters}
            users={users}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
          />
        </div>
    </div>
  );
};

export default Dashboard;
