import './main.scss';

import superagent from 'superagent';
import React from 'react';
import { render } from 'react-dom';

import Board from '../shared/components/Board';

import {Game} from '../shared/AI';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            currentPlayer: 1,
            message: 'Playing',
            code: 0
        };

        this.restart = this.restart.bind(this);
        this.makeMove = this.makeMove.bind(this);
        this.getAiMove = this.getAiMove.bind(this);
        this.updateGameState = this.updateGameState.bind(this);
        this.handleCellClick = this.handleCellClick.bind(this);
    }

    restart() {
        this.setState({
            board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            currentPlayer: 1,
            message: 'Playing',
            code: 0
        });
    }

    handleCellClick(cell) {
        if (this.state.board[cell] === 0 && this.state.code === 0) {
            this.makeMove(cell);
            this.getAiMove();
        }
    }

    makeMove(cell) {
        var board = this.state.board;
        board[cell] = this.state.currentPlayer;

        this.setState({
            board: board,
            currentPlayer: this.state.currentPlayer === 1 ? 2 : 1
        });
        this.updateGameState();
    }

    getAiMove() {
        superagent.get('/api/num')
            .query({ board: this.state.board.join(',') })
            .query({ depth: true })
            .end((err, res) => {
                if (err) throw err;
                this.makeMove(res.body.move);
            });
    }

    updateGameState() {
        var game = new Game(this.state.currentPlayer, this.state.board);

        if (game.over()) {
            var newState = game.getGameState();
            this.setState({
                message: newState.message,
                code: newState.code

            });
        }
    }

    render() {
        return (
            <div className="wrapper">
                <p>{ this.state.message }</p>
                <Board board={this.state.board} onCellClick={this.handleCellClick}/>
                <button onClick={this.restart}>Restart</button>
            </div>
        );
    }
}

render(<App/>, document.getElementById("app-view"));