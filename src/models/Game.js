'use strict';

const uuid = require('uuid').v4;

/**
 * This is a in-memory persistence mock. In a real world app this would be a DB or alike.
 */
const games = {};

function saveNewGame (gameData) {
  const id = getUniqueId();
  
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
  recover: recoverGame
};
