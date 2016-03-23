export class MinimaxAI {
    constructor(piece) {
        this.PLAYER = piece;
        this.OPPONENT = piece === 1 ? 2 : 1;
        this.CHOICE = undefined;
    }

    getMove(game) {
        this.minimax(game);
        return this.CHOICE;
    }

    score(game) {
        if (game.win(this.PLAYER)) {
            return 10;
        } else if (game.win(this.OPPONENT)) {
            return -10;
        } else {
            return 0;
        }
    }

    minimax(game) {
        if (game.over()) { return this.score(game) }
        var scores = [];
        var moves = [];
        var _this = this;

        game.getAvailableMoves().forEach((move) => {
            var possibleGame = game.getNewState(move);
            scores.push(_this.minimax(possibleGame));
            moves.push(move);
        });

        if (game.activeTurn === this.PLAYER) {
            var maxScore = scores.reduce((a, b) => {
                return Math.max(a, b);
            });
            var maxScoreIndex = scores.indexOf(maxScore);
            this.CHOICE = moves[maxScoreIndex];
            return scores[maxScoreIndex];
        } else {
            var minScore = scores.reduce((a, b) => {
                return Math.min(a, b);
            });
            var minScoreIndex = scores.indexOf(minScore);
            this.CHOICE = moves[minScoreIndex];
            return scores[minScoreIndex];
        }
    }
}

export class DepthMinimaxAI extends MinimaxAI {
    constructor(piece) {
        super(piece);
    }

    getMove(game) {
        this.minimax(game, 0);
        return this.CHOICE;
    };

    score(game, depth) {
        if (game.win(this.PLAYER)) {
            return 10 - depth;
        } else if (game.win(this.OPPONENT)) {
            return depth - 10;
        } else {
            return 0;
        }
    };

    minimax(game, depth) {
        if (game.over()) { return this.score(game, depth) }
        var scores = [];
        var moves = [];
        var _this = this;

        game.getAvailableMoves().forEach((move) => {
            var possibleGame = game.getNewState(move);
            scores.push(_this.minimax(possibleGame, depth));
            moves.push(move);
        });

        if (game.activeTurn === this.PLAYER) {
            var maxScore = scores.reduce((a, b) => {
                return Math.max(a, b);
            });
            var maxScoreIndex = scores.indexOf(maxScore);
            this.CHOICE = moves[maxScoreIndex];
            return scores[maxScoreIndex];
        } else {
            var minScore = scores.reduce((a, b) => {
                return Math.min(a, b);
            });
            var minScoreIndex = scores.indexOf(minScore);
            this.CHOICE = moves[minScoreIndex];
            return scores[minScoreIndex];
        }
    };
}

export class Game {
    constructor(activeTurn, boardArray) {
        this.activeTurn = activeTurn || 1;
        this.boardArray = boardArray || [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    getGameStateString() {
        if (this.win(1)) {
            return 'X has won!';
        } else if (this.win(2)) {
            return 'O has won!';
        } else if (this.tie()) {
            return 'It\'s a tie!';
        } else {
            return 'Playing...';
        }
    }

    getBoard() {
        return this.boardArray.slice();
    }

    getBoardString() {
        return this.getBoard().join(',');
    }

    getPlayer() {
        return this.activeTurn;
    }

    move(move) {
        this.boardArray[move] = this.activeTurn;
        this.activeTurn = this.activeTurn === 1 ? 2 : 1;
    }

    isEmpty(cell) {
        return this.boardArray[cell] === 0;
    }

    getNewState(move) {
        var activeTurn = this.activeTurn === 1 ? 2 : 1;
        var boardArray = this.boardArray.slice();
        boardArray[move] = this.activeTurn;
        return new Game(activeTurn, boardArray);
    }

    getAvailableMoves() {
        var available = [];
        for (var i = 0; i < this.boardArray.length; i++) {
            if (this.boardArray[i] === 0) {
                available.push(i);
            }
        }
        return available;
    }

    over() {
        return this.win(1) || this.win(2) || this.tie();
    }

    tie() {
        return this.getAvailableMoves().length === 0;
    }

    win(piece) {
        return this.checkRows(piece) || this.checkCols(piece) || this.checkDiags(piece);
    }

    checkRows(piece) {
        return (this.boardArray[0] === piece && this.boardArray[1] === piece && this.boardArray[2] === piece) ||
            (this.boardArray[3] === piece && this.boardArray[4] === piece && this.boardArray[5] === piece) ||
            (this.boardArray[6] === piece && this.boardArray[7] === piece && this.boardArray[8] === piece);
    }

    checkCols(piece) {
        return (this.boardArray[0] === piece && this.boardArray[3] === piece && this.boardArray[6] === piece) ||
            (this.boardArray[1] === piece && this.boardArray[4] === piece && this.boardArray[7] === piece) ||
            (this.boardArray[2] === piece && this.boardArray[5] === piece && this.boardArray[8] === piece);
    }

    checkDiags(piece) {
        return (this.boardArray[0] === piece && this.boardArray[4] === piece && this.boardArray[8] === piece) ||
            (this.boardArray[2] === piece && this.boardArray[4] === piece && this.boardArray[6] === piece);
    }

}