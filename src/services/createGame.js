'use strict';

function createGame (rows, cols) {
  const mineLocations = createMines(rows, cols);
  return {
    rows,
    cols,
    mineLocations
  }
}

function createMines (rows, cols) {
  const squareCount = rows * cols;
  const mineCount = parseInt(
    squareCount * 0.4 + Math.random() * squareCount / 15
  );

  if (mineCount >= squareCount) {
    // try recursively to get less mines than squares
    return createMines(rows, cols);
  }

  /**
   * Temporally store locations in an object to speed up
   * the look up for existing mines
   */
  const mineLocations = Object.create(null);
  let minesToAdd = mineCount;
  while (minesToAdd) {
    const locations = getRandomLocation(rows, cols);
    const locationLabel = locations.join(':');

    if (!mineLocations[locationLabel]) {
      mineLocations[locationLabel] = true;
      minesToAdd--;
    }
  }

  // return locations as array o labels (x:y)
  return Object.keys(mineLocations);
}

function getRandomLocation (rows, cols) {
  return [
    parseInt(Math.random() * rows),
    parseInt(Math.random() * cols)
  ];
}

module.exports = createGame;
