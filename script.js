const prompt = require('prompt-sync')();

const gameBoard = (function() {
    //private
    let board = ['', '', '', '', '', '', '', '', ''];
    let winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWin = (symbol) => {
        for (let i = 0; i < 8; i++) {
            if (board[winCombinations[i][0]] === symbol && symbol === board[winCombinations[i][1]] && symbol === board[winCombinations[i][2]]) return true;
        }
        return false;
    };

    const writeMove = (symbol, i) => board[i] = symbol;
    //return public var and funcs
    return {checkWin, writeMove, board};
})();

const player = (function(symbol, name) {
    let turn = false;
    return {symbol, turn, name};
});

const Game = (() => {
    let p1 = player('x', 'sai');
    let p2 = player('o', 'computer');
    let turn = p1, index;
    for (let i = 0; i < 9; i++) {
        index = prompt(`enter index - ${turn.symbol}: `);
        gameBoard.writeMove(turn.symbol, parseInt(index));
        if (gameBoard.checkWin(turn.symbol)) {
            console.log(`${turn.symbol} wins`);
            break;
        }
        turn = (turn == p1) ? p2 : p1;
    }
    console.log(gameBoard.board)
})();