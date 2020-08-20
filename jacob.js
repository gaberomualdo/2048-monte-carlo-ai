var gamesPerMove = 50;
var totalMoveScores = [0,0,0,0];
var totalMoveMoves = [0,0,0,0];
var totalGamesDone = 0;
var paused = false;
var moveCalculationBegin;
var workers;

// create workers
window.addEventListener('load', function() {
	if(window.Worker) {
		var amountOfWorkers = 8;
		workers = [];
		for(var i = 0; i < amountOfWorkers; i++) {
			workers.push(new Worker('jacobWorker.js'));
			workers[i].onmessage = function(e){
				var [finalScore, moves, move_index] = e.data;
				totalMoveScores[move_index] += finalScore;
				totalMoveMoves[move_index] += moves;

				totalGamesDone += 1;
				checkDoneAndMakeBestMove()
			}
		}
	}
})

function makeMove(){
	moveCalculationBegin = (new Date()).getTime()

	totalMoveScores = [0,0,0,0];
	totalMoveMoves = [0,0,0,0];
	totalGamesDone = 0;

	["left","right","up","down"].forEach(function(move, move_index){
		for(var games = 0;games < gamesPerMove;games++){
			if(workers) {
				setTimeout(simulateRun(move, move_index, workers[games % workers.length]), 0);
			} else {
				setTimeout(simulateRun(move, move_index), 0);
			}
		}
	});
}
function simulateRun(move, move_index, worker = undefined){
	var simulation = getNewGameObj();
	simulation.board = [game.board[0].slice(0), game.board[1].slice(0), game.board[2].slice(0), game.board[3].slice(0)];

	if(worker) {
		simulation.main_move(move);

		if(JSON.stringify(simulation.board) != JSON.stringify(game.board)){
			worker.postMessage([simulation.board, move_index]);
		} else {
			totalGamesDone += 1;
			checkDoneAndMakeBestMove()
		}
	} else {
		simulation.main_move(move);

		if(JSON.stringify(simulation.board) != JSON.stringify(game.board)){
			var moves = 0;

			while(simulation.check_gameover() == false){
				simulation.main_move(["left","right","up","down"][Math.floor(Math.random() * 4)]);
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
	if(totalGamesDone >= gamesPerMove * 4){
		var bestMoveIdx = totalMoveScores.indexOf(Math.max(...totalMoveScores));
		var bestMove = ["left","right","up","down"][bestMoveIdx];
		game.main_move(bestMove);

		var msToCalculateMove = (new Date()).getTime() - moveCalculationBegin;

		var consoleEntry = document.createElement('p');
		consoleEntry.innerHTML = `Best Move: ${bestMove.toUpperCase()}<br />
		Avg. Score: ${parseFloat(totalMoveScores[bestMoveIdx] / gamesPerMove).toFixed(2)}<br />
		Avg. Moves/Simulation: ${parseFloat(totalMoveMoves[bestMoveIdx] / gamesPerMove).toFixed(2)}<br />
		Simulations/Move: ${gamesPerMove}<br />
		Calculated In: ${msToCalculateMove}ms`;

		document.querySelector("div.console").appendChild(consoleEntry);

		(function(){
			var elem = document.querySelector("div.console");
			elem.scrollTop = elem.scrollHeight;
		})();

		displayBoard();

		var gameover = game.check_gameover()
		if(gameover == false && !paused){
			setTimeout(makeMove, 0);
		} else if (gameover == true) {
			document.querySelector("div.console").style.overflowY = "auto";
			var consoleRestartBtn = document.querySelector("div.right div.toparea button");
			consoleRestartBtn.innerHTML = "Restart AI";
			consoleRestartBtn.setAttribute('onclick', 'window.location.reload();');
		}
	}
}

window.addEventListener('load', function() {
	setTimeout(makeMove, 0);
});
