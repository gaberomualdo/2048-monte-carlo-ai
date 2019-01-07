const flipMatrix = matrix => (
	matrix[0].map((column, index) => (
		matrix.map(row => row[index])
	))
);

const rotateMatrix = matrix => (
	flipMatrix(matrix.reverse())
);

const rotateMatrixCounterClockwise = matrix => (
	flipMatrix(matrix).reverse()
);
function getNewGameObj(){
	return {
		// Board Array
		board: [
			["",
			"",
			"",
			""],
			["",
			"",
			"",
			""],
			["",
			"",
			"",
			""],
			["",
			"",
			"",
			""]
		],
		// Generate random 2 or 4 in random spot at board
		addNewNum: function(){
			var openSpots = [];
			this.board.forEach(function(row, row_amount){
				row.forEach(function(spot, col_amount){
					if(spot == ""){
						openSpots.push([row_amount, col_amount]);
					}
				});
			});
			var newNumSpot = openSpots[Math.floor(Math.random() * openSpots.length)];
			var number = Math.random() < 0.9 ? 2 : 4;
			this.board[newNumSpot[0]][newNumSpot[1]] = number;
		},
		move: function(direction){
			//self_ref.board = [this.board[0].slice(0), this.board[1].slice(0), this.board[2].slice(0), this.board[3].slice(0)];
			var self_ref = this;
			switch(direction){
				case "left":
					self_ref.board.forEach(function(row, row_index){
						var condensedRow = [];
						row.forEach(function(spot){
							if(spot != ""){
								condensedRow.push(spot);
							}
						});
						condensedRow.forEach(function(spot, spot_index){
							if(spot == condensedRow[spot_index + 1] && spot != ""){
								condensedRow[spot_index] = spot * 2;
								condensedRow[spot_index + 1] = "";
							}
						});
						var returnRow = [];
						condensedRow.forEach(function(spot){
							if(spot != ""){
								returnRow.push(spot);
							}
						});
						self_ref.board[row_index].forEach(function(spot, spot_index){
							if(returnRow[spot_index]){
								self_ref.board[row_index][spot_index] = returnRow[spot_index];
							}else{
								self_ref.board[row_index][spot_index] = "";
							}
						});
					});
					break;
				case "right":
					self_ref.board.forEach(function(row, row_index){
						var condensedRow = [];
						row.forEach(function(spot){
							if(spot != ""){
								condensedRow.push(spot);
							}
						});
						condensedRow.reverse();
						condensedRow.forEach(function(spot, spot_index){
							if(spot == condensedRow[spot_index + 1] && spot != ""){
								condensedRow[spot_index] = spot * 2;
								condensedRow[spot_index + 1] = "";
							}
						});
						var returnRow = [];
						condensedRow.forEach(function(spot){
							if(spot != ""){
								returnRow.push(spot);
							}
						});
						self_ref.board[row_index].forEach(function(spot, spot_index){
							if(returnRow[spot_index]){
								self_ref.board[row_index][spot_index] = returnRow[spot_index];
							}else{
								self_ref.board[row_index][spot_index] = "";
							}
						});
						self_ref.board[row_index].reverse();
					});
					break;
				case "up":
					self_ref.board = rotateMatrix(self_ref.board);
					self_ref.board.forEach(function(row, row_index){
						var condensedRow = [];
						row.forEach(function(spot){
							if(spot != ""){
								condensedRow.push(spot);
							}
						});
						condensedRow.reverse();
						condensedRow.forEach(function(spot, spot_index){
							if(spot == condensedRow[spot_index + 1] && spot != ""){
								condensedRow[spot_index] = spot * 2;
								condensedRow[spot_index + 1] = "";
							}
						});
						var returnRow = [];
						condensedRow.forEach(function(spot){
							if(spot != ""){
								returnRow.push(spot);
							}
						});
						self_ref.board[row_index].forEach(function(spot, spot_index){
							if(returnRow[spot_index]){
								self_ref.board[row_index][spot_index] = returnRow[spot_index];
							}else{
								self_ref.board[row_index][spot_index] = "";
							}
						});
						self_ref.board[row_index].reverse();
					});
					self_ref.board = rotateMatrixCounterClockwise(self_ref.board);
					break;
				case "down":
					self_ref.board = rotateMatrix(self_ref.board);
					self_ref.board.forEach(function(row, row_index){
						var condensedRow = [];
						row.forEach(function(spot){
							if(spot != ""){
								condensedRow.push(spot);
							}
						});
						condensedRow.forEach(function(spot, spot_index){
							if(spot == condensedRow[spot_index + 1] && spot != ""){
								condensedRow[spot_index] = spot * 2;
								condensedRow[spot_index + 1] = "";
							}
						});
						var returnRow = [];
						condensedRow.forEach(function(spot){
							if(spot != ""){
								returnRow.push(spot);
							}
						});
						self_ref.board[row_index].forEach(function(spot, spot_index){
							if(returnRow[spot_index]){
								self_ref.board[row_index][spot_index] = returnRow[spot_index];
							}else{
								self_ref.board[row_index][spot_index] = "";
							}
						});
					});
					self_ref.board = rotateMatrixCounterClockwise(self_ref.board);
			}
			//this.board = self_ref.board;
		},
		check_gameover: function(){
			var gamemover = true;
			var currentBoard = [this.board[0].slice(0), this.board[1].slice(0), this.board[2].slice(0), this.board[3].slice(0)];

			this.move("left");
			if(this.board.join(",") == currentBoard.join(",")){
				this.move("right");
				if(this.board.join(",") == currentBoard.join(",")){
					this.move("up");
					if(this.board.join(",") == currentBoard.join(",")){
						this.move("down");
						if(this.board.join(",") == currentBoard.join(",")){
							return true;
						}
					}
				}
			}
			this.board = currentBoard;
			return false;
		},
		main_move: function(direction){
			var startGame = this.board.join(",");
			this.move(direction);
			if(this.board.join(",") != startGame){
				this.addNewNum();
			}
		},
		getScore: function(){
			var score = 0;
			this.board.forEach(function(row){
				row.forEach(function(spot){
					if(spot != ""){
						score += spot;
					}
				});
			});
			
			return score;
		}
	};
}

var game = getNewGameObj();

game.addNewNum();
game.addNewNum();
