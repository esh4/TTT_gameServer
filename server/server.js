const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser')

// ------------------ Config stuff / testing ------------------- 
// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
  });

app.use(bodyParser.json())

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

// -------------------------- Game API --------------------------
//import {Board} from "./Board";  
const Board = require('./Board')

var state = {
  board: new Board(),
  name: 'esh'
}

app.post('/api/turn', (req, res, next) => {
  state.board.takeTurn(req.body.location)
  next()
}, (req, res) => {
  res.json({'board': state.board})
})

app.post('/api/update', (req, res, next) => {
  console.log(req.body)
})

app.get('/api/game-state', (req, res) => {
  res.json({
    squares: state.board.squares,
    xIsNext: state.board.xIsNext
  })
})


process.on('SIGINT', () => { console.log("Bye bye!"); process.exit(); });