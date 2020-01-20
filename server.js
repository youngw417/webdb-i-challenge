const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();
const accountRouter = require('./account/accountRouter');

server.use(express.json());
server.use('/api/accounts', accountRouter);

server.get('/', (req, res) => {
  res.status(200).send('Welcome to Database');
});

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    errorMessage: 'Something is wrong'
  });
});
module.exports = server;
