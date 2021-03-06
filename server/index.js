const express = require('express');
const csv = require('csvtojson');
const cors = require('cors');
const api = require('../src/api.js');

const server = express();

//accept only JSON
server.use(express.json());
server.use(cors());

// healthcheck API
server.get('/api/ping', (req, res) => res.send('pong'));

server.get(api.URLS.books, async (req, res) => {
  const jsonBooks = await csv().fromFile('./books.csv');
  res.send(jsonBooks);
});

//set port and log to the console
server.listen(api.PORT, () =>
  console.log(`Server listening on port: ${api.PORT}`)
);
