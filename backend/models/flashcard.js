const mongoose = require('mongoose');

const flashcardSchema = mongoose.Schema({
  subject:  { type: String, required: true },
  title:    { type: String, required: true },
  content:  { type: String, required: true }
});

module.exports = mongoose.model('Flashcard', flashcardSchema);
