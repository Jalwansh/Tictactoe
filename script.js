const homeScreen = document.getElementById('home-screen');
const gameScreen = document.getElementById('game-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const boardDiv = document.getElementById('board');
const statusDiv = document.getElementById('status');

let board, gameActive;

function showHome() {
  homeScreen.style.display = 'flex';
  gameScreen.style.display = 'none';
}

function showGame() {
  homeScreen.style.display = 'none';
  gameScreen.style.display = 'flex';
}

function startGame() {
  board = Array(9).fill('');
  gameActive = true;
  statusDiv.textContent = "Your turn!";
  restartBtn.style.display = 'none';
  renderBoard();
}

function renderBoard() {
  boardDiv.innerHTML = '';
  board.forEach((cell, idx) => {
    const cellDiv = document.createElement('div');
    cellDiv.classList.add('cell');
    if (cell) cellDiv.classList.add(cell.toLowerCase());
    cellDiv.textContent = cell;
    cellDiv.addEventListener('click', () => handleCellClick(idx));
    boardDiv.appendChild(cellDiv);
  });
}

function handleCellClick(idx) {
  if (!gameActive || board[idx]) return;
  board[idx] = 'X';
  renderBoard();
  if (checkWin('X')) {
    statusDiv.textContent = "You won the game!";
    gameActive = false;
    restartBtn.style.display = 'block';
    return;
  } else if (board.every(cell => cell)) {
    statusDiv.textContent = "It's a draw!";
    gameActive = false;
    restartBtn.style.display = 'block';
    return;
  }
  statusDiv.textContent = "Robot's turn...";
  setTimeout(robotMove, 500); // Small delay for realism
}

function robotMove() {
  if (!gameActive) return;
  // Simple AI: pick a random empty cell
  const emptyCells = board.map((cell, idx) => cell === '' ? idx : null).filter(idx => idx !== null);
  if (emptyCells.length === 0) return;
  const move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  board[move] = 'O';
  renderBoard();
  if (checkWin('O')) {
    statusDiv.textContent = "You lost!";
    gameActive = false;
    restartBtn.style.display = 'block';
    return;
  } else if (board.every(cell => cell)) {
    statusDiv.textContent = "It's a draw!";
    gameActive = false;
    restartBtn.style.display = 'block';
    return;
  }
  statusDiv.textContent = "Your turn!";
}

function checkWin(player) {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diags
  ];
  return winPatterns.some(pattern =>
    pattern.every(idx => board[idx] === player)
  );
}

startBtn.addEventListener('click', () => {
  showGame();
  startGame();
});
restartBtn.addEventListener('click', startGame);

// On load, show home
showHome();