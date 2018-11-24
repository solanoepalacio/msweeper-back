'use strict';

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const getConfig = require('shared/config').getInstance;

const app = express();

function initApp (router) {
  const config = getConfig();
  return new Promise(function(resolve, reject) {
    app.use(morgan('short'));

    app.use(corsMiddleware);

    app.use(bodyParser.json());

    app.use(router);

    app.use(notFoundMiddleware);

    app.use(errorMiddleware);

    const publicDir = path.resolve('src/public');
    console.log('pub', publicDir);
    app.use(express.static('public'));

    const { port, host } = config.app;

    app.listen(port, host, function (error){
      if (error) reject(error);
      else console.log('Server is listening on port:', port);
    });
  });
}

function notFoundMiddleware (req, res, next) {
  res.status(404).send('Not found');
}

function errorMiddleware (error, req, res, next) {
  console.error('ERROR', error);
  res.status(500).send(error.toString());
}

function corsMiddleware (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "*");
  next();
}

module.exports = initApp;