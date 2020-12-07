const express = require("express");
const cors = require("cors");
const { connect } = require('./db');
const api = require("./api");
const server = express();
const port = process.env.PORT || 3001;
// let corsOptions = {}

// if (process.env.NODE_ENV === 'production') {
//   corsOptions = {
//     origin: 'https://discoverdoo.com',
//   }
// } else {
//   corsOptions = {
//     origin: 'http://localhost:3000',
//   }
// }


const corsOptions = {
    origin: 'https://discoverdoo.com',
  }


async function runServer() {
  await connect();
  server.use(cors(corsOptions));
  server.use(api);
  server.listen(port, () => console.log(`API on port ${port}`));
}

runServer();