import React from 'react';
import Modal from 'react-modal';
import '../styles/FiltersModal.css';

const FiltersModal = ({
  isOpen,
  onClose,
  sortOption,
  setSortOption,
  searchQuery,
  setSearchQuery,
  creationDateFrom,
  setCreationDateFrom,
  creationDateTo,
  setCreationDateTo,
  updateDateFrom,
  setUpdateDateFrom,
  updateDateTo,
  setUpdateDateTo,
  category,
  setCategory,
  categories,
  applyFilters,
  users,
  selectedUsers,
  setSelectedUsers,
}) => {

  const handleUserChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedUsers(selected);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Filters Modal" ariaHideApp={false} className="modal">
      <div className="modal-content">
        <h2 className="modal-title">Filters</h2>
        <b>Creation Date</b>
        <div className="row-container">
          <div className="col-container"> 
            <p>From</p>
            <input
              type="date"
              placeholder="Creation Date From"
              value={creationDateFrom}
              onChange={(e) => setCreationDateFrom(e.target.value)}
            />
          </div>
          <div className="col-container">
            <p>To</p>
            <input
              type="date"
              placeholder="Creation Date To"
              value={creationDateTo}
              onChange={(e) => setCreationDateTo(e.target.value)}
            />
          </div>
        </div>
        <b>Update Date</b>
        <div className="row-container">
          <div className="col-container">
            <p>From</p>
            <input
              type="date"
              placeholder="Update Date From"
              value={updateDateFrom}
              onChange={(e) => setUpdateDateFrom(e.target.value)}
            />
          </div>
          <div className="col-container">
            <p>To</p>
            <input
              type="date"
              placeholder="Update Date To"
              value={updateDateTo}
              onChange={(e) => setUpdateDateTo(e.target.value)}
            />
          </div>
        </div>
        Category
        <select onChange={(e) => setCategory(e.target.value)} value={category}>
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
        <label>
          Users:
          <select
            multiple
            value={selectedUsers}
            onChange={handleUserChange}
          >
            {users.map((user) => (
              <option key={user._id} value={user.username}>
                {user.username}
              </option>
            ))}
          </select>
        </label>
        <button className="apply-button" onClick={applyFilters}>Apply</button>
        <div className="cancel-button-container">
          <button className="cancel-button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default FiltersModal;
