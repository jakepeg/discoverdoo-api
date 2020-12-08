const mongoose = require('mongoose');
const Activity = mongoose.model('Activity');
const User = mongoose.model('User');
const bodyParser = require("body-parser");
const server = require("../lib");
const mailer = require("../mailer");
server.use(bodyParser.json());

server.post('/api/v1/activities' , function (req , res) {
  mailer();
  const activityData = req.body;
  Activity.create(activityData).then(function () {
    return res.json("Activity succesfuly added! The activity will be verified before it is published. You can view it in My Activities in the meantime.");
  });
});

server.get('/api/v1/activities' , function (req , res) {
    Activity.find({ promoted: true, published: true }).then(function (activitiesMongo) {
  return res.json(activitiesMongo);
  });
 });

 server.get('/api/v1/activitiesByCategory/:cat' , function (req , res) {
  var regex = new RegExp(req.params.cat, 'i');
  Activity.find({category: regex, published: true }).then(function (activitiesMongo) {
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

server.get('/api/v1/userFavourites/:uid' , function (req , res) {
  User.find({ user: req.params.uid }).then(function (userMongo) {
  return res.json(userMongo);
  });
});

server.delete('/api/v1/activities/:id' , function (req , res) {
  const { params: {id}} = req;
  Activity.findOneAndRemove({_id: id}).then(function () {
    return res.json("Activity succesfuly deleted!");
  });
});

server.post('/api/v1/register' , function (req , res) {
  const userData = req.body;
  User.create(userData).then(function () {
    return res.json("User succesfuly added!");
  });
});

server.patch('/api/v1/activities/:id' , function (req , res) {
  const { body, params: {id}} = req;
  Activity.findOneAndUpdate({_id: id}, body, {new: true, runValidators: true}).then(function () {
    return res.json("Activity succesfuly updated!");
  });
});

server.patch('/api/v1/favourites/:id' , function (req , res) {
  const { body, params: {id}} = req;
  console.log(body);
  User.findOneAndUpdate({user: id}, body, {new: true, runValidators: false}).then(function () {
    return res.json("User succesfuly updated!");
  });
});

module.exports = server