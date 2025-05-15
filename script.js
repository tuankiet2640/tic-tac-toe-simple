const board = document.getElementById('game-board');
const resetBtn = document.getElementById('reset');
const sizeInput = document.getElementById('size');
const setSizeBtn = document.getElementById('set-size');
let size = 50;
let currentPlayer = 'X';
let gameActive = true;
let cells = Array(size * size).fill('');

function renderBoard() {
    board.innerHTML = '';
    board.style.setProperty('--size', size);
    cells.forEach((cell, idx) => {
        const div = document.createElement('div');
        div.className = 'cell';
        div.textContent = cell;
        div.addEventListener('click', () => handleCellClick(idx));
        board.appendChild(div);
    });
}

function handleCellClick(idx) {
    if (!gameActive || cells[idx]) return;
    cells[idx] = currentPlayer;
    renderBoard();
    if (checkWinner(idx)) {
        setTimeout(() => alert(currentPlayer + ' wins!'), 10);
        gameActive = false;
        return;
    }
    if (cells.every(cell => cell)) {
        setTimeout(() => alert('Draw!'), 10);
        gameActive = false;
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner(idx) {
    // Only check lines through the last move
    const row = Math.floor(idx / size);
    const col = idx % size;
    const player = currentPlayer;
    // Directions: [dr, dc]
    const directions = [
        [0, 1], // horizontal
        [1, 0], // vertical
        [1, 1], // diagonal \
        [1, -1] // diagonal /
    ];
    for (const [dr, dc] of directions) {
        let count = 1;
        // Check in the positive direction
        for (let step = 1; step < 5; step++) {
            const r = row + dr * step;
            const c = col + dc * step;
            if (r < 0 || r >= size || c < 0 || c >= size) break;
            if (cells[r * size + c] === player) count++;
            else break;
        }
        // Check in the negative direction
        for (let step = 1; step < 5; step++) {
            const r = row - dr * step;
            const c = col - dc * step;
            if (r < 0 || r >= size || c < 0 || c >= size) break;
            if (cells[r * size + c] === player) count++;
            else break;
        }
        if (count >= 5) return true; // Win if 5 in a row
    }
    return false;
}

resetBtn.addEventListener('click', () => {
    cells = Array(size * size).fill('');
    currentPlayer = 'X';
    gameActive = true;
    renderBoard();
});

setSizeBtn.addEventListener('click', () => {
    const newSize = Math.max(3, Math.min(50, parseInt(sizeInput.value, 10) || 3));
    size = newSize;
    cells = Array(size * size).fill('');
    currentPlayer = 'X';
    gameActive = true;
    renderBoard();
});

renderBoard();
