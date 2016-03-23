import {DepthMinimaxAI, MinimaxAI, Game} from '../shared/AI.jsx';
import {toLetter} from '../shared/core.jsx';

import {Router} from 'express';

var routes = Router();

routes.get('/num', function(req, res, next) {
    var aiPiece,
        response = {},
        pretty = false;

    if (req.query.pretty) {
        pretty = JSON.parse(req.query.pretty);
    }

    if (!req.query.board) {
        return res.status(400).end("No board provided.");
    }

    var board = req.query.board.split(',').map(function(current) {
        return parseInt(current);
    });

    if (!Array.isArray(board) || board.length != 9) {
        return res.status(400).end("Invalid board.");
    }

    var xCount = board.filter(function(current) {
        return current === 1;
    }).length;
    var oCount = board.filter(function(current) {
        return current === 2;
    }).length;

    if (oCount > xCount) {
        return res.status(400).end("There can never be more 'O's than 'X's");
    } else if (oCount === xCount) {
        aiPiece = 1;
    } else if (oCount < xCount) {
        aiPiece = 2;
    } else {
        return res.status(400).end("Something went wrong...");
    }

    var gameState = new Game(aiPiece, board),
        depth = req.query.depth || false,
        AI = depth ? new DepthMinimaxAI(aiPiece) : new MinimaxAI(aiPiece);

    response["move"] = AI.getMove(gameState);

    if (pretty === true) {
        board[response["move"]] = aiPiece;
        response["pretty"] = [
            [toLetter(board[0]), toLetter(board[1]), toLetter(board[2])],
            [toLetter(board[3]), toLetter(board[4]), toLetter(board[5])],
            [toLetter(board[6]), toLetter(board[7]), toLetter(board[8])]
        ];
    }

    res.json(response);
});

routes.get('/letter', function(req, res) {
    var aiPiece = req.query.aipiece === 'X' ? 1 : 2;
    var board = req.query.board.split(',').map(function(current) {
        return current === 'X' ? 1 : current === 'X' ? 2 : 0;
    });

    var AI = new MinimaxAI(aiPiece);
    var gameState = new Game(aiPiece, board);
    var aiMove = AI.getMove(gameState);
    res.json({ move: aiMove });
});

routes.get('*', function(req, res) {
    res.json({ message: "Invalid API call." });
});

export default routes;