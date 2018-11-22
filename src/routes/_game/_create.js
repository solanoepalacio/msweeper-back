'use strict';
const express = require('express');

const route = express();

const GameModel = require('models/Game');
const createGame = require('services/createGame');
const checkPlayerMove = require('services/checkPlayerMove');

// create game.
route.post('/', function (req, res) {
  const { body: { rows, cols } } = req;

  if (!rows || !cols) {
    return res.status(400).send('InvalidParams');
  }

  const game = createGame(rows, cols);
  const gameData = GameModel.save(game);

  res.status(200).send(
    JSON.stringify(gameData)
  );
});

const validActions = {
  'sweep': true,
  'flag': true
};

// update game;
route.put('/', function (req, res) {
  const { gameId, action, location } = req.body;
  
  if (
    !gameId ||
    !action ||
    !location.x ||
    !location.y ||
    !validActions[action]
  ) {
    return res.status(400).send('InvalidParams')
  }

  const game = GameModel.find(gameId);
  if (!game) {
    res.status(404).send('GameNotFound');
  } else if (game.status === 'finished') {
    res.status(400).send(`Game ${gameId} is over.`);
  }

  let isGameOver = false;

  if (action === 'sweep') {
    isGameOver = checkPlayerMove(game, location);
  }

  const gameStatus = isGameOver ? 'finished' : 'playing';

  GameModel.update(gameId, action, location, gameStatus);
  
  res.status(200).send(isGameOver);
});

module.exports = {
  prefix: '/create',
  handler: route
}
