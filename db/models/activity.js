const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 128 },
  description: { type: String, required: true, maxlength: 512 },
  image: { type: String, required: true, maxlength: 128 },
  ageFrom: { type: String, required: true, maxlength: 128 },
  ageTo: { type: String, required: true, maxlength: 128 },
  price: { type: String, required: true, maxlength: 128 },
  website: { type: String, required: true, maxlength: 128 },
  userId: { type: String, required: true, maxlength: 128 },
  category: { type: String, required: true, maxlength: 128 },
  medium: { type: String, required: true, maxlength: 128 },
  id: { type: String, required: true, maxlength: 128 }
})

// module.exports = mongoose.model('Activity', activitySchema);

const Activity = mongoose.model('Activity',activitySchema);
exports.Activity = Activity;