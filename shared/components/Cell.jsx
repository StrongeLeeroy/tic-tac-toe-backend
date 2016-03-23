import React from 'react';

function toLetter(number) {
    return number === 0 ? '' : number === 1 ? 'X' : 'O';
}

export default class Cell extends React.Component {

    handleClick() {
        this.props.handleClick(this.props.index);
    }

    render() {
        return (
            <div className="cell" onClick={this.handleClick.bind(this)}>
                { toLetter(this.props.value) }
            </div>
        );
    }
}