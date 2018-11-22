'use strict';

const express = require('express');

const loadRoutes = require('routes/loadRoutes');

const router = loadRoutes(__dirname);

module.exports = {
  prefix: '/game',
  handler: router
}
