const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 128 },
  description: { type: String, required: true, maxlength: 2048 },
  image: { type: String, required: true, maxlength: 128 },
  ageFrom: { type: Number, required: true },
  ageTo: { type: Number, required: true },
  price: { type: String, required: true, maxlength: 128 },
  website: { type: String, required: true, maxlength: 128 },
  userId: { type: String, required: true, maxlength: 128 },
  category: { type: String, required: true, maxlength: 128 },
  medium: { type: String, required: true, maxlength: 128 },
  id: { type: String, required: true, maxlength: 128 },
  promoted: { type: Boolean },
  published: { type: Boolean, required: true }
})

const Activity = mongoose.model('Activity',activitySchema);
exports.Activity = Activity;