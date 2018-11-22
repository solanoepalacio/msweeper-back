'use strict';

const fs = require('fs');
const path = require('path');

const express = require('express');

const loadRoutes = require('routes/loadRoutes');

const routesBaseDir = path.resolve('src/routes');

function initRouter () {
    return loadRoutes(routesBaseDir);
}

module.exports = initRouter;