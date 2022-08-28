const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator"); //plugin validator

const userSchema = mongoose.Schema({
  email:        { type: String, required: true, unique: true },
  password:     { type: String, required: true },
});

userSchema.plugin(uniqueValidator); //THe plugin throws an error if unique = false

module.exports = mongoose.model('User', userSchema);
