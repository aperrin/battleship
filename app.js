
const express = require('express')
const app = express()


// Define routage
// Define 'www' for my website root (/)
app.use('/', express.static('www'));



// Socket connection
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


// Setup the game (game -> type module)
const game = require('./battleship.js');
