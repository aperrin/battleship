
const express = require('express')
const app = express()


// Define routage
app.use('/', express.static('www'));



// Socket connection
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

