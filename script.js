const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('gameBoard');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');
let turn = 'X';

const winningCombinations = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === player;
        });
    });
}

function checkDraw() {
    return [...cells].every(cell => cell.textContent);
}

function handleClick(e) {
    const cell = e.target;
    if (cell.textContent) return;

    cell.textContent = turn;

    if (checkWin(turn)) {
        message.textContent = `${turn} wins!`;
        cells.forEach(cell => cell.removeEventListener('click', handleClick));
        return;
    }

    if (checkDraw()) {
        message.textContent = `It's a draw!`;
        return;
    }

    turn = turn === 'X' ? 'O' : 'X';
}

function restartGame() {
    cells.forEach(cell => cell.textContent = '');
    message.textContent = '';
    turn = 'X';
    cells.forEach(cell => cell.addEventListener('click', handleClick));
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);