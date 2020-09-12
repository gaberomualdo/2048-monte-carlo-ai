global.maxTile = 0;
var secondsSinceStart = 0;
function updateMilestones() {
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

  secondsSinceStart += calculatedMS / 1000;

  var consoleEntry = document.createElement('div');
  consoleEntry.innerHTML = `<span>Best Move:</span> ${bestMove.toUpperCase()}<br />
<span>Avg. Score:</span> ${parseFloat(totalScore / (totalSimulations / 4)).toFixed(2)}<br />
<span>Avg. Moves:</span> ${parseFloat(totalMoves / (totalSimulations / 4)).toFixed(2)}<br />
<span>Simulations:</span> ${totalSimulations}<br />
<span>Took:</span> ${calculatedMS}ms`;

  consoleElm.appendChild(consoleEntry);
  consoleElm.scrollTop = consoleElm.scrollHeight + 10;
}

function addRestartAIButton() {
  document.body.classList.add('restart-button-available');
  document.body.classList.remove('paused');
}

function initGUI(makeMove, startGame) {
  startTime = new Date().getTime();

  // pause or restart button
  var pauseOrRestartBtn = document.querySelector('div.right div.toparea button');
  pauseOrRestartBtn.addEventListener('click', function () {
    if (document.body.classList.contains('restart-button-available')) {
      startGame();
      secondsSinceStart = 0;
      document.body.classList.remove('restart-button-available');
    } else {
      document.body.classList.toggle('paused');
      paused = !paused;
      if (!paused) {
        setTimeout(makeMove, 0);
      }
    }
  });

  // add rel="noreferrer nofollow" and target="_blank" to links in bottom area
  document.querySelectorAll('div.bottom a').forEach((elm) => {
    elm.setAttribute('rel', 'noreferrer nofollow');
    elm.setAttribute('target', '_blank');
  });

  // scroll down marker
  var bottomArea = document.querySelector('div.bottom');
  var scrollDown = document.querySelector('div.scroll-down');
  function updateScrollDownMarker() {
    if (window.innerHeight + window.pageYOffset < bottomArea.getBoundingClientRect().top + window.pageYOffset) {
      scrollDown.style.opacity = '1';
    } else {
      scrollDown.style.opacity = '0';
    }
  }
  window.addEventListener('load', updateScrollDownMarker);
  window.addEventListener('resize', updateScrollDownMarker);
  window.addEventListener('scroll', updateScrollDownMarker);
}

module.exports = { displayBoard, addToConsole, addRestartAIButton, initGUI };
