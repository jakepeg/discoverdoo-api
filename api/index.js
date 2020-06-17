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

// const filePath = "./activities.json";
// const fs = require("fs");
// const path = require("path");
// const activitiesData = require(filePath);

// server.delete("/api/v1/activities/:id", (req, res) => {
//   const { id } = req.params;
//   const activityIndex = activitiesData.findIndex(c => c.id === id);
//   activitiesData.splice(activityIndex, 1);
//   const pathToFile = path.join(__dirname, filePath);
//   const stringifiedData = JSON.stringify(activitiesData, null, 2);
//   fs.writeFile(pathToFile, stringifiedData, err => {
//     if (err) {
//       console.log(err);
//     }
//     return res.json("Activity has been succesfuly added!");
//   });
// });

// server.get("/api/v1/activities", (req, res) => {
//   return res.json(activitiesData);
// });

// server.get("/api/v1/activities/:id", (req, res) => {
//   const {
//     id
//   } = req.params;
//   const activity = activitiesData.find(c => c.id === id);
//   return res.json(activity);
// });

// server.post("/api/v1/activities", (req, res) => {
//   const activity = req.body;
//   activitiesData.push(activity);

//   const pathToFile = path.join(__dirname, filePath);
//   const stringifiedData = JSON.stringify(activitiesData, null, 2);

//   fs.writeFile(pathToFile, stringifiedData, err => {
//     if (err) {
//       console.log(err);
//     }
//     return res.json("Activity has been succesfuly added!");
//   });
// });

// server.patch("/api/v1/activities/:id", (req, res) => {
//   const {
//     id
//   } = req.params;
//   const activity = req.body;
//   const activityIndex = activitiesData.findIndex(c => c.id === id);

//   activitiesData[activityIndex] = activity;

//   const pathToFile = path.join(__dirname, filePath);
//   const stringifiedData = JSON.stringify(activitiesData, null, 2);
//   fs.writeFile(pathToFile, stringifiedData, err => {
//     if (err) {
//       console.log(err);
//     }
//     return res.json("Activity has been succesfuly updated!");
//   });
// });

module.exports = server