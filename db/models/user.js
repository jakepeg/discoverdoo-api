const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user: { type: String, required: true, maxlength: 128 },
  favourites: { type: Array, required: false }
})

const User = mongoose.model('User',userSchema);
exports.User = User;