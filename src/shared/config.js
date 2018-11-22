'use strict';

let config;

module.exports.setInstance = function (instance) {
  config = instance;
}

module.exports.getInstance =  function () {
  return config;
}
