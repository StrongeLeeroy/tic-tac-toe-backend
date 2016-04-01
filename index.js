'use strict';
require('babel-register');

const server = require('./server/server.jsx').default;
const PORT = process.env.port || 1337;

server.listen(PORT, function() {
    console.log('Server listening on port', PORT);
});
