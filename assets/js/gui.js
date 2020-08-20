var maxTile = 0;
var startTime;
function updateMilestones() {
  var secondsSinceStart = (new Date().getTime() - startTime) / 1000;
  if (isNaN(secondsSinceStart)) {
    secondsSinceStart = 0;
  }
  document.querySelector('div.milestones h1').innerHTML = `Reached <div class="num${maxTile} tile">${maxTile}</div> in ${
    Math.floor(secondsSinceStart * 100) / 100
  }s`;
}

function displayBoard(game) {
  document.querySelector('div.game').innerHTML = '';
  game.board.forEach(function (row) {
    row.forEach(function (spot) {
      var className = '';
      if (spot == '') {
        spot = '';
      } else {
        var spotInt = parseInt(spot);
        if (spotInt > maxTile) {
          maxTile = spotInt;
          updateMilestones();
        }
        className = 'num' + spot;
      }
      document.querySelector('div.game').innerHTML += "<div class='" + className + "'>" + spot + '</div>';
    });
  });
}
function addToConsole(bestMove, totalScore, totalMoves, totalSimulations, calculatedMS) {
  var consoleElm = document.querySelector('div.console');

  var consoleEntry = document.createElement('p');
  consoleEntry.innerHTML = `Best Move: ${bestMove.toUpperCase()}<br />
Avg. Score: ${parseFloat(totalScore / (totalSimulations / 4)).toFixed(2)}<br />
Avg. Moves: ${parseFloat(totalMoves / (totalSimulations / 4)).toFixed(2)}<br />
Simulations: ${totalSimulations}<br />
Took: ${calculatedMS}ms`;

  consoleElm.appendChild(consoleEntry);
  consoleElm.scrollTop = consoleElm.scrollHeight;
}

function addRestartAIButton() {
  document.body.classList.add('restart-button-available');
  document.body.classList.remove('paused');
}

function initGUI(makeMove) {
  startTime = new Date().getTime();

  // pause or restart button
  var pauseOrRestartBtn = document.querySelector('div.right div.toparea button');
  pauseOrRestartBtn.addEventListener('click', function () {
    if (document.body.classList.contains('restart-button-available')) {
      window.location.reload();
    } else {
      document.body.classList.toggle('paused');
      paused = !paused;
      if (!paused) {
        setTimeout(makeMove, 0);
      }
    }
  });
}

module.exports = { displayBoard, addToConsole, addRestartAIButton, initGUI };
