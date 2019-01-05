var gamesPerMove = 50;
var totalMoveScores = [0,0,0,0];
var totalMoveCount = 0;
var totalGamesDone = 0;
function makeMove(){
	totalMoveScores = [0,0,0,0];
	totalGamesDone = 0;
	totalMoveCount = 0;
	
	["left","right","up","down"].forEach(function(move, move_index){
		for(var games = 0;games < gamesPerMove;games++){
			setTimeout(simulateRun(move, move_index), 0);
		}
	});
}
function simulateRun(move, move_index){
	var simulation = getNewGameObj();
	simulation.board = [game.board[0].slice(0), game.board[1].slice(0), game.board[2].slice(0), game.board[3].slice(0)];
	simulation.main_move(move);
	while(simulation.check_gameover() == false){
		simulation.main_move(["left","right","up","down"][Math.floor(Math.random() * 4)]);
		totalMoveCount += 1;
	}
	totalMoveScores[move_index] += simulation.getScore();
	totalGamesDone += 1;
	if(totalGamesDone >= gamesPerMove * 4){
		var bestMove = ["left","right","up","down"][totalMoveScores.indexOf(Math.max(...totalMoveScores))];
		game.main_move(bestMove);
		console.log("Best move was " + bestMove.toUpperCase() + " with average score of " + parseFloat(Math.max(...totalMoveScores) / gamesPerMove).toFixed(2) + ".\nAverage move count on all runs was " + parseFloat(totalMoveCount / gamesPerMove).toFixed(2) + " with " + gamesPerMove + " simulations per move.");
		displayBoard();

		if(game.check_gameover() == false){
			if((Math.max(...totalMoveScores) / gamesPerMove) > 2200){
				gamesPerMove = 125;
			}else if((Math.max(...totalMoveScores) / gamesPerMove) > 1600){
				gamesPerMove = 100;
			}else if((Math.max(...totalMoveScores) / gamesPerMove) > 1000){
				gamesPerMove = 75;
			}else if((Math.max(...totalMoveScores) / gamesPerMove) > 750){
				gamesPerMove = 68;
			}else{
				gamesPerMove = 50;
			}
			setTimeout(makeMove, 0);
	    }
	}
}

setTimeout(makeMove, 100);