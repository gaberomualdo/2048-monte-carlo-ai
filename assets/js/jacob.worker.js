importScripts('game.js');

onmessage = function (e) {
  var [board, move_index] = e.data;
  var simulation = getNewGameObj();
  simulation.board = board;

  var moves = 0;

  //for(var i = 0; i < 100; i++) {
  while (simulation.check_gameover() == false) {
    simulation.main_move(['left', 'right', 'up', 'down'][Math.floor(Math.random() * 4)]);
    moves++;
  }
  postMessage([simulation.getScore(), moves, move_index]);
};
