const mongoose = require('mongoose');
const Activity = mongoose.model('Activity');
const bodyParser = require("body-parser");
const server = require("../lib");
server.use(bodyParser.json());

server.get('/api/v1/activities' , function (req , res) {
  Activity.find({}).then(function (activitiesMongo) {
  return res.json(activitiesMongo);
  });
 });

server.get('/api/v1/activities/:id' , function (req , res) {
  Activity.find({id: req.params.id}).then(function (activityMongo) {
  return res.json(activityMongo[0]);
  });
});

server.post('/api/v1/activities' , function (req , res) {
  const activityData = req.body;
  Activity.create(activityData).then(function () {
    return res.json("Activity succesfuly added!");
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