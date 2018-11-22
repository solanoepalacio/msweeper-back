'use strict';

const initServer = require('./init');

initServer().catch(function(error) {
    console.error('Server crashed: ', error);
});