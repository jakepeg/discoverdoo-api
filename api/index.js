const mongoose = require('mongoose');
const Activity = mongoose.model('Activity');
const User = mongoose.model('User');
const bodyParser = require("body-parser");
const server = require("../lib");
server.use(bodyParser.json());

server.post('/api/v1/activities' , function (req , res) {
  const activityData = req.body;
  Activity.create(activityData).then(function () {
    return res.json("Activity succesfuly added!");
  });
});

server.post('/api/v1/register' , function (req , res) {
  const userData = req.body;
  User.create(userData).then(function () {
    return res.json("User succesfuly added!");
  });
});

server.get('/api/v1/activities' , function (req , res) {
    Activity.find({ promoted: true }).then(function (activitiesMongo) {
  return res.json(activitiesMongo);
  });
 });

 server.get('/api/v1/activitiesByCategory/:cat' , function (req , res) {
  var regex = new RegExp(req.params.cat, 'i');
  Activity.find({category: regex}).then(function (activitiesMongo) {
  return res.json(activitiesMongo);
  });
 });

server.get('/api/v1/activities/:id' , function (req , res) {
  Activity.find({id: req.params.id}).then(function (activityMongo) {
  return res.json(activityMongo[0]);
  });
});

server.get('/api/v1/myActivities/:uid' , function (req , res) {
  Activity.find({ userId: req.params.uid }).then(function (activityMongo) {
  return res.json(activityMongo);
  });
});

server.patch('/api/v1/activities/:id' , function (req , res) {
  const { body, params: {id}} = req;
  Activity.findOneAndUpdate({_id: id}, body, {new: true, runValidators: true}).then(function () {
    return res.json("Activity succesfuly updated!");
  });
});

server.delete('/api/v1/activities/:id' , function (req , res) {
  const { params: {id}} = req;
  Activity.findOneAndRemove({_id: id}).then(function () {
    return res.json("Activity succesfuly deleted!");
  });
});

module.exports = server