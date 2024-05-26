const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPrivate: {
    type: Boolean,
    default: false
  }, 
}, { timestamps: true });

// Add text index
NoteSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model('Note', NoteSchema, 'note');

