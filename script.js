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
        for (let c in winCombinations) {
            if (board[c[0]] === symbol && symbol === board[c[1]] && symbol === board[c[2]]) return true;
        }
        return false;
    };

    const writeMove = (symbol, i) => board[i] = symbol;
    //return public var and funcs
    return {checkWin, writeMove};
})();

const player = (function(symbol, name) {
    let turn = false;
    return {symbol, turn, name};
});

const Game = (() => {
    let p1 = player('x', 'sai');
    let p2 = player('o', 'computer');
    let symbol, turn = p1;
    for (let i = 0; i < 9; i++) {
        index = prompt(`enter index - ${turn.symbol}: `);
        gameBoard.writeMove(turn.symbol, index);
        turn = (turn == p1) ? p2 : p1;
        if (gameBoard.checkWin(turn.symbol)) console.log()
    }
})();