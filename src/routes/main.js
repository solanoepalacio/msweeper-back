'use strict';

const fs = require('fs');
const path = require('path');

const express = require('express');

const route = express();

let html;
const htmldir = path.resolve('src/public/index.html');
route.get('/', function (req, res, next) {
  if (html) {
    res.status(200).send(html);
  } else {
    fs.createReadStream(htmldir, (error, htmlBuffer) => {
      if (error) next(error);
      else {
        html = htmlBuffer;
        res.status(200).send(html)
      }
    });
  }
});

module.exports = {
  prefix: '/',
  handler: route
}
