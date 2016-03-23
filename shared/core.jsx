function toLetter(number) {
    return parseInt(number) === 0 ? '-' : parseInt(number) === 1 ? 'X' : 'O';
}

module.exports = {
    toLetter: toLetter
};