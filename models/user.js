const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  userEmail: {
    type: String,
    required: true,
    unique: true,
    match: /.+@.+\..+/i,
  },
  userPassword: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('User', userSchema);
