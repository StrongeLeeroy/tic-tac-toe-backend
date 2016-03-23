'use strict';
require('babel-register');

const PORT = process.env.PROD || 8083;

var path = require('path');
var express = require('express');
var app = express();

var routes = require('./src/routes.jsx').default;

app.use('/api', routes);
app.use('/', express.static('./dist'));

app.get('*', function(req, res) {
    res.sendStatus(404);
});

app.listen(PORT, function() {
   console.log('Server listening on port', PORT);
});