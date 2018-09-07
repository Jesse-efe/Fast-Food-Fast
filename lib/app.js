'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var route = require('./routes.js');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

route(app);

app.listen(3000, function () {
  console.log('app running on port.');
});

module.exports = app;