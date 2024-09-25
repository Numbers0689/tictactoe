const gameBoard = (function() {
    //private
    let board = ['', '', '', '', '', '', '', '', ''];

    const checkWin = (symbol) => {
        const winCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i = 0; i < 8; i++) {
            if (board[winCombinations[i][0]] === symbol && symbol === board[winCombinations[i][1]] && symbol === board[winCombinations[i][2]]) return true;
        }
        return false;
    };

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }
    };

    const readPos = (i) => {
        return board[i];
    };

    const writeMove = (symbol, i) => board[i] = symbol;
    //return public var and funcs
    return {checkWin, writeMove, board, reset, readPos};
})();


const player = (function(symbol) {
    this.symbol = symbol;
    const getSymbol = () => this.symbol;
    return {getSymbol};
});


const ui = (function() {
    const buttons = document.querySelectorAll(".btn");
    const play = document.querySelector("#play");
    const msg = document.querySelector("#playerInfo");

    const updateBoard = () => {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].textContent = gameBoard.readPos(i);
        }
    }

    buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
            if (Game.isOver() || e.target.textContent !== '') return;
            Game.playRound(e.target.id);
            updateBoard();
        });
    });

    play.addEventListener('click', () => {
        gameBoard.reset();
        Game.reset();
        updateBoard();
        changeMsg("Player X's turn")
    })

    const changeMsg = (m) => {
        msg.textContent = m;
    };
    return {changeMsg};
})();

const Game = (() => {
    let p1 = new player('X');
    let p2 = new player('O');
    let round = 1;
    let over = false;

    const playRound = (i) => {
        if (gameBoard.readPos(i) !== '') return;

        gameBoard.writeMove(getCurrentPlayer(), i);

        if (gameBoard.checkWin(getCurrentPlayer())) {
            ui.changeMsg(`Player ${getCurrentPlayer()} won`);
            over = true;
            return;
        }

        if (round === 9) {
            ui.changeMsg(`It's a Draw`);
            over = true;
            return;
        }

        round++;
        ui.changeMsg(`Player ${getCurrentPlayer()}'s turn`);
    };

    const isOver = () => over;

    const getCurrentPlayer = () => {
        if (round % 2 == 1) return p1.getSymbol();
        return p2.getSymbol();
    };

    const reset = () => {
        round = 1;
        over = false;
    };

    return {playRound, isOver, reset};
})();