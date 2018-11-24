'use strict';

const fs = require('fs');
const path = require('path');

const Router = require('express').Router;

function loadRoutes (dirname) {
  const dirs = fs.readdirSync(dirname).filter(function(filename) {
      // filter possible private files
      return !filename.startsWith('_');
  });

  if (!dirs.length) {
      // 
      throw new Error('RoutesNotFound');
  }

  return dirs.reduce((router, filename) => {
      const routeFilePath = path.join(dirname, filename);
      const route = require(routeFilePath);
      console.log('adding route', route.prefix);
      router.use(route.prefix, route.handler);
      return router;
  }, Router());
}

module.exports = loadRoutes;