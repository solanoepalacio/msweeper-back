'use strict';

const initApp = require('init/app');
const initRouter = require('init/router');
const initConfig = require('init/config');

function initServer () {
  initConfig();
  const router = initRouter();

  return initApp(router);
}

module.exports = initServer;