const express = require("express");
const cors = require("cors");
const { connect } = require('./db');
const api = require("./api");
const server = express();
const port = process.env.PORT || 3001;

// const corsOptions = {
//   origin: 'http://localhost:3000',
// }

async function runServer() {
  await connect();
  server.use(cors());
  server.use(api);
  server.listen(port, () => console.log(`API on port ${port}`));
}

runServer();