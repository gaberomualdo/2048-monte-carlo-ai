import Worker from './jacob.worker.js';

var { displayBoard, addToConsole, addRestartAIButton, initGUI } = require('./gui');

var game = getNewGameObj();

game.addNewNum();
game.addNewNum();

displayBoard(game);

var gamesPerMove = 50; // the amount of simulations per move: left, right, up, or down. So a value of 50 would mean a total of 200 simulations per actual game move (--> 50 simulations * 4 moves = 200).
var totalMoveScores = [0, 0, 0, 0]; // the total scores of all the simulations in any given game move, for each possible move (left, right, up, or down). To get the average, divide each by gamesPerMove.
var totalMoveMoves = [0, 0, 0, 0]; // the total amount of moves of all the all the simulations in any given game move, for each possible move (left, right, up, or down). To get the average, divide each by gamesPerMove.
var totalGamesDone = 0; // the amount of simulations that have been completed in the current game move. Once it reaches gamesPerMove * 4, all the simulations for the current game move are completed.
global.paused = false;
var moveCalculationBegin; // the MS since Epoch in which the current game move began calculating and running simulations
var workers; // is the Worker API is available, this represents a list of workers which can be used to differ various tasks such as running simulations. Uses the Worker variable imported from the Jacob Worker file.

// create workers
window.addEventListener('load', function () {
  if (window.Worker) {
    var amountOfWorkers = 8;
    workers = [];
    for (var i = 0; i < amountOfWorkers; i++) {
      workers.push(new Worker());
      workers[i].onmessage = function (e) {
        var [finalScore, moves, move_index] = e.data;
        totalMoveScores[move_index] += finalScore;
        totalMoveMoves[move_index] += moves;

        totalGamesDone += 1;
        checkDoneAndMakeBestMove();
      };
    }
  }
});

function makeMove() {
  var newTotalSimulations = parseInt(document.getElementById('simulCount').value);
  if (!isNaN(newTotalSimulations) && newTotalSimulations > 0) {
    gamesPerMove = Math.ceil(newTotalSimulations / 4);
  }

  moveCalculationBegin = new Date().getTime();

  totalMoveScores = [0, 0, 0, 0];
  totalMoveMoves = [0, 0, 0, 0];
  totalGamesDone = 0;

  ['left', 'right', 'up', 'down'].forEach(function (move, move_index) {
    for (var games = 0; games < gamesPerMove; games++) {
      if (workers) {
        setTimeout(simulateRun(move, move_index, workers[games % workers.length]), 0);
      } else {
        setTimeout(simulateRun(move, move_index), 0);
      }
    }
  });
}
function simulateRun(move, move_index, worker = undefined) {
  var simulation = getNewGameObj();
  simulation.board = [game.board[0].slice(0), game.board[1].slice(0), game.board[2].slice(0), game.board[3].slice(0)];

  if (worker) {
    simulation.main_move(move);

    if (JSON.stringify(simulation.board) != JSON.stringify(game.board)) {
      worker.postMessage([simulation.board, move_index]);
    } else {
      totalGamesDone += 1;
      checkDoneAndMakeBestMove();
    }
  } else {
    simulation.main_move(move);

    if (JSON.stringify(simulation.board) != JSON.stringify(game.board)) {
      var moves = 0;

      while (simulation.check_gameover() == false) {
        simulation.main_move(['left', 'right', 'up', 'down'][Math.floor(Math.random() * 4)]);
        moves++;
      }
      totalMoveScores[move_index] += simulation.getScore();
      totalMoveMoves[move_index] += moves;
    }

    totalGamesDone += 1;
    checkDoneAndMakeBestMove();
  }
}
function checkDoneAndMakeBestMove() {
  if (totalGamesDone >= gamesPerMove * 4) {
    var bestMoveIdx = totalMoveScores.indexOf(Math.max(...totalMoveScores));
    var bestMove = ['left', 'right', 'up', 'down'][bestMoveIdx];
    game.main_move(bestMove);

    var msToCalculateMove = new Date().getTime() - moveCalculationBegin;

    addToConsole(bestMove, totalMoveScores[bestMoveIdx], totalMoveMoves[bestMoveIdx], gamesPerMove * 4, msToCalculateMove);
    displayBoard(game);

    var gameover = game.check_gameover();
    if (gameover == false && !paused) {
      setTimeout(makeMove, 0);
    } else if (gameover == true) {
      addRestartAIButton();
    }
  }
}

window.addEventListener('load', function () {
  setTimeout(makeMove, 0);
});

initGUI(makeMove);
