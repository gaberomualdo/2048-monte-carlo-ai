function displayBoard(){
	document.querySelector("div.game").innerHTML = "";
	game.board.forEach(function(row){
		row.forEach(function(spot){
			var className = "";
			if(spot == ""){
				spot = "";
			}else{
				className = "num" + spot;
			}
			document.querySelector("div.game").innerHTML += "<div class='" + className + "'>" + spot + "</div>";
		});
	});
}
displayBoard();