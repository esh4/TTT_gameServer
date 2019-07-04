const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser')
// ------------------ Config stuff / testing ------------------- 
// console.log that your server is up and running

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
  });

const http = require('http').Server(app)
const io = require('socket.io').listen(http)

http.listen(port, () => console.log(`Listening on port ${port}`));

app.use(bodyParser.json())

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

// -------------------------- Game API --------------------------
const Board = require('./Board')

var state = {
  board: new Board(),
}

app.post('/api/turn', (req, res, next) => {
  try{
    state.board.takeTurn(req.body.location, req.body.player)}
  catch(e){
    res.status(406) //Not ur turn...
    console.log(e)
  }
  next()
}, (req, res, next) => {
  res.json({'board': state.board})
  next()
}, (req, res) => {
  io.sockets.emit('next-player')
})

app.get('/api/game-state', (req, res) => {
  res.json({
    squares: state.board.squares,
    xIsNext: state.board.xIsNext
  })
})

io.on('connection', (socket) => {
  console.log('client connected')
  console.log(socket)
})


process.on('SIGINT', () => { console.log("Bye bye!"); process.exit(); });