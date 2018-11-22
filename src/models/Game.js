'use strict';

const uuid = require('uuid').v4;

/**
 * This is a in-memory persistence-mock. In a real world app this would be a DB or alike.
 */
const games = {};

function saveNewGame (gameData) {
  const id = getUniqueId();
  
  const game = Object.assign({}, gameData, {
    id: id,
    actions: [],
    status: 'new',
    updateAt: Date.now()
  });

  games[id] = game;

  return game;
}

function updateGame (gameId, action, location, status) {
  const game = games[gameId];

  if (!game) {
    throw new Error('GameNotFound');
  }

  game.actions.push({ action, location });
  game.status = status;

  return true;
}

function findGame (gameId) {
  return games[gameId] || false;
}

function getUniqueId () {
  const id = uuid();

  if (games[id]) {
    return getUniqueId();
  } else {
    return id;
  }
}

module.exports = {
  save: saveNewGame,
  update: updateGame,
  find: findGame
};
