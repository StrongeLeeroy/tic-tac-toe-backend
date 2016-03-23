import React from 'react';
import Cell from './Cell';

export default class Board extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="board">
                {
                    this.props.board.map((cell, index) => <Cell key={index} value={cell} index={index} handleClick={this.props.onCellClick} />)
                }
            </div>
        );
    }
}