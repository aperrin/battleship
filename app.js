// Setup the game (game -> type module)
const game = require('./battleship.js');
// lib qui permet de servir des pages web
const express = require('express')

const app = express()


// Define routage
// Define 'www' for my website root (/)
app.use('/', express.static('www'));

var s1 = new game.Ship("B", 2, "V");
var b = new game.Board(10);
b.add_ship(s1, 2, 0);
b.print_grid();

// Req = objects containing requests
// res = object to send to client, with answer
app.get("/getstate", function (req, res){
	// Convert js object to json format
	var send = JSON.stringify(b.grid);
	res.send(send)
});

// Socket connection
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});




