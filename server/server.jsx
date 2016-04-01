import path from 'path';
import express from 'express';

const server = express();
import routes from './routes';

server.use('/api', routes);
server.use('/', express.static('./dist'));

server.get('*', function(req, res) {
    res.sendStatus(404);
});

export default server;