'use strict';

const path = require('path');

const setConfigInstance = require('shared/config').setInstance;

const enviroment = process.env.ENVIRONMENT || 'default';

function initConfig () {
  
  let config;

  const configDir = path.resolve('config', enviroment.concat('.json'));
  config = require(configDir);

  setConfigInstance(config);
}

module.exports = initConfig;