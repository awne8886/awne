// Import Stockfish
importScripts('stockfish.js');

// Initialize Stockfish
const stockfish = new Worker('stockfish.js');

// Initialize chessboard and game logic
const chess = new Chess();
const board = Chessboard('chessboard', {
  draggable: true,
  onDragStart,
  onDrop,
  onSnapEnd,
});

// Player vs AI mode by default
let playerVsAI = true;

// Toggle between Player vs AI and AI vs AI modes
function toggleMode() {
    playerVsAI = !playerVsAI;
    document.getElementById('status').innerText = playerVsAI ? 'Player vs AI' : 'AI vs AI';
  
    if (!playerVsAI && !chess.game_over()) {
      // AI vs AI mode, AI's turn
      makeAIMove();
    }
  }

// Handle drag start
function onDragStart (source, piece) {
  // Add your logic for drag start if needed
}

// Handle piece drop
function onDrop (source, target) {
  // Update chess position after the move
  const move = chess.move({ from: source, to: target });

  // Check for game over
  if (chess.game_over()) {
    alert('Game Over');
  } else if (playerVsAI && move) {
    // Player vs AI mode
    makeAIMove();
  }
}

// Handle snap end
function onSnapEnd () {
  board.position(chess.fen());
}

// Make the AI move using Stockfish
function makeAIMove() {
  stockfish.postMessage('position fen ' + chess.fen());
  stockfish.postMessage('go depth 10'); // You can adjust the depth for difficulty
}

// Listen to messages from Stockfish
stockfish.onmessage = function (event) {
  const message = event.data;
  if (message.startsWith('bestmove')) {
    const bestMove = message.split(' ')[1];
    chess.move(bestMove);
    board.position(chess.fen());

    if (playerVsAI && !chess.game_over()) {
      // Player vs AI mode, AI's turn
      makeAIMove();
    }
  }
};