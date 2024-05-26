// routes/noteRoutes.js
const express = require('express');
const router = express.Router();
const Note = require('../models/Note'); // Adjust the path if necessary

// GET all notes
router.get('/', async (req, res) => {
  try {

    const { sort, search, creationDateFrom, creationDateTo, updateDateFrom, updateDateTo, category, selectedUsers } = req.query;

    let sortOption = {};
    let searchQuery = {};

    switch (sort) {
      case 'creationDate':
        sortOption = { createdAt: -1 };
        break;
      case 'updateDate':
        sortOption = { updatedAt: -1 };
        break;
      case 'category':
        sortOption = { category: 1 };
        break;
      case 'title':
        sortOption = { title: 1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    if (search) {
      searchQuery = { $text: { $search: search } };
    }

    if (creationDateFrom || creationDateTo) {
      searchQuery.createdAt = {};
      if (creationDateFrom) searchQuery.createdAt.$gte = new Date(creationDateFrom);
      if (creationDateTo) searchQuery.createdAt.$lte = new Date(creationDateTo);
    }
  
    if (updateDateFrom || updateDateTo) {
      searchQuery.updatedAt = {};
      if (updateDateFrom) searchQuery.updatedAt.$gte = new Date(updateDateFrom);
      if (updateDateTo) searchQuery.updatedAt.$lte = new Date(updateDateTo);
    }
  
    if (category) {
      searchQuery.category = category;
    }

    // User filter
    if (selectedUsers) {

      console.log("SELECTED USERS:");
      console.log(selectedUsers);

      searchQuery.userId = { $in: selectedUsers };
    }

    console.log("Hi")

    const notes = await Note.find(searchQuery).sort(sortOption);

    console.log("HELooooo")
    console.log(notes)

    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single note by ID
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/notes - Create a new note
router.post('/', async (req, res) => {

  console.log(req)

  const { title, description, category, isPrivate } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  try {
    const newNote = new Note({
      title,
      description,
      category,
      isPrivate,
      userId: req.user._id,
    });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: 'Error saving note', error });
  }
});

// PUT (update) a note by ID
router.put('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    note.title = req.body.title;
    note.description = req.body.description;
    note.category = req.body.category;
    note.isPrivate = req.body.isPrivate;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Delete a note by ID
router.delete('/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting note', error });
  }
});

module.exports = router;
