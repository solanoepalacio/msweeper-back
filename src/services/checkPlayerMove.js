'use strict';

/**
 * checks if a sweep action was done on a mine
 */

function checkPlayerMove(game, location) {
  const { x, y } = location;
  const locationLabel = [x, y].join(':');

  const isGameOver = game.mineLocations.indexOf(locationLabel) > 0

  return isGameOver;
}


module.exports = checkPlayerMove;
