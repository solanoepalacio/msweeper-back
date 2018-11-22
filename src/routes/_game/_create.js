'use strict';
const express = require('express');

const route = express();

const createGame = require('services/createGame');

route.post('/', function (req, res) {
  const { body: { rows, cols } } = req;
  const game = createGame(rows, cols);
  res.send(JSON.stringify(game));
});

module.exports = {
  prefix: '/create',
  handler: route
}