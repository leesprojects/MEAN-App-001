const mongoose = require('mongoose'); //Create a scheme

//Scheme is a blueprint, it needs a model too
const postSchema = mongoose.Schema({ //JS uses String instead of TS which uses string
  title:    { type: String, required: true },
  content:  { type: String, required: true }
});

module.exports = mongoose.model('Post', postSchema); //Export so the whole app can use it
