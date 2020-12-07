const express = require("express");
const cors = require("cors");
const { connect } = require('./db');
const api = require("./api");
const server = express();
const port = process.env.PORT || 3001;
// let corsOptions = {}

// if (port === 3001) {
//   corsOptions = {
//     origin: 'http://localhost:3000',
//   }
// } else {
//   corsOptions = {
//     origin: 'https://discoverdoo.com',
//   }
// }

// const corsOptions = {
//   origin: 'https://discoverdoo.com',
// }

var allowedOrigins = ['http://localhost:3000',
                      'https://discoverdoo.com'];


async function runServer() {
  await connect();
  // server.use(cors(corsOptions));

  server.use(cors({
    origin: function(origin, callback){
      // allow requests with no origin 
      // (like mobile apps or curl requests)
      if(!origin) return callback(null, true);
      if(allowedOrigins.indexOf(origin) === -1){
        var msg = 'The CORS policy for this site does not ' +
                  'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  }));



  server.use(api);
  server.listen(port, () => console.log(`API on port ${port}`));
}

runServer();