const express = require("express");
const cors = require("cors");
const { connect } = require('./db');
const api = require("./api");
const server = express();
const port = process.env.PORT || 3001;
let corsOptions = {}

if (port === 3001) {
  corsOptions = {
    origin: 'http://localhost:3000',
  }
} else {
  corsOptions = {
    origin: 'https://discoverdoo.com',
  }
}

// const corsOptions = {
//   origin: 'https://discoverdoo.com',
// }


async function runServer() {
  await connect();
  server.use(cors(corsOptions));
  server.use(api);
  server.listen(port, () => console.log(`API on port ${port}`));
}

runServer();