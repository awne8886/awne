// Import Chessboard.js and Stockfish
import 'chessboard-1.0.0.min.js';
import 'stockfish.js';

// Initialize Stockfish
const stockfish = new Worker('stockfish.js');

// Initialize chessboard
const board1 = Chessboard('board1', {
  draggable: true,
  position: 'start',
  onDragStart,
  onDrop,
  onSnapEnd,
});

// Initialize chess game
const game = new Chess();
let playerVsStockfish = true; // Default mode

// Handle drag start
function onDragStart (source, piece) {
  // Prevent dragging when it's not the player's turn or against Stockfish
  if (playerVsStockfish && game.in_checkmate()) return false;
  if (game.turn() === 'w' && piece.search(/^b/) !== -1) return false;
  if (game.turn() === 'b' && piece.search(/^w/) !== -1) return false;
}

// Handle piece drop
function onDrop (source, target) {
  // Move validation
  const move = game.move({ from: source, to: target, promotion: 'q' });

  // Update chessboard position
  board1.position(game.fen());

  // Player vs Stockfish mode
  if (playerVsStockfish && move) {
    makeStockfishMove();
  }
}

// Handle snap end
function onSnapEnd () {
  board1.position(game.fen());
}

// Make a move using Stockfish
function makeStockfishMove() {
  stockfish.postMessage('position fen ' + game.fen());
  stockfish.postMessage('go depth 10'); // You can adjust the depth for difficulty
}

// Listen to messages from Stockfish
stockfish.onmessage = function (event) {
  const message = event.data;
  if (message.startsWith('bestmove')) {
    const bestMove = message.split(' ')[1];
    game.ugly_move(bestMove);
    board1.position(game.fen());
  }
};
