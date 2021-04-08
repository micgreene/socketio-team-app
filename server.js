'use strict';

require('dotenv').config();
const PORT = process.env.PORT || 3000;
const io = require('socket.io')(PORT);
const Player = require('./player.js')
const sentences = [
  `Tom threw Tim three thumbtacks`,
  `He threw three free throws`,
  `So, this is the sushi chef`,
  `Eddie edited it`,
  `I saw a kitten eating chicken in the kitchen`,
  `Can you can a can as a canner can can a can?`,
  `You know New York, you need New York, you know you need unique New York`,
  `I saw a kitten eating chicken in the kitchen`,
  `If a dog chews shoes, whose shoes does he choose?`,
  `I thought I thought of thinking of thanking you`,
  `I wish to wash my Irish wristwatch`,
  `Fred fed Ted bread, and Ted fed Fred bread`,
  `I slit the sheet, the sheet I slit, and on the slitted sheet I sit`,
  `A skunk sat on a stump and thunk the stump stunk, but the stump thunk the skunk stunk`,
  `Lesser leather never weathered wetter weather better`,
]

const players = {
    // fills in as users connect
};



io.on('connection', (socket) => {
  console.log(`${socket.id} HAS CONNECTED!`);
  socket.on('newPlayer', payload => {
    socket.broadcast.emit('joined', payload)
    socket.emit('joined', payload)
    // adds new player
    players[payload] = new Player(payload)
  })
  let sentence;
  // let winner = null;
  // let start = null;
  socket.on('message', payload => {


    // check player current players
    if (payload.text.split('\n')[0] === 'data') {
      console.log(players)
      console.log(sentence)
    }

    // start game
    if (payload.text.split('\n')[0] === 'start') {
      // let winner = true;
      // start game with random sentence
      sentence = sentences[Math.floor(Math.random() * sentences.length)]
      startGame(socket, sentence);
      // start = true;
    }

    // does not match sentence
    // if (payload.text.split('\n')[0] !== sentence && start) {
    //   socket.broadcast.emit('wrong', payload)
    //   socket.emit('wrong', payload)
    // }

    // winner
    if (payload.text.split('\n')[0] === sentence) {
      // stop game and display winner
      let winner = true;
      if (winner) {
        sentence = sentences[Math.floor(Math.random() * sentences.length)]
        // winner = payload.username;
        players[payload.username].score++
        socket.broadcast.emit('round', payload)
        socket.emit('round', payload)
      }
      Object.keys(players).forEach(value => {
        if (players[value].score === 3) {
          socket.broadcast.emit('winner', payload)
          socket.emit('winner', payload)
        } else {
          nextQuestion(socket, sentence)
        }
      })
    }

    socket.broadcast.emit('message', payload)
    socket.emit('message', payload)
  })
})

// new player joins game
function startGame(socket, sentence) {
  setTimeout(() => {
    socket.broadcast.emit('countdown', '3')
    socket.emit('countdown', '3')
  }, 1000)
  setTimeout(() => {
    socket.broadcast.emit('countdown', '2')
    socket.emit('countdown', '2')
  }, 2000)
  setTimeout(() => {
    socket.broadcast.emit('countdown', '1')
    socket.emit('countdown', '1')
  }, 3000)
  setTimeout(() => {
    socket.broadcast.emit('countdown', '===========================')
    socket.emit('countdown', '===========================')
    socket.broadcast.emit('countdown', sentence)
    socket.emit('countdown', sentence)
    socket.broadcast.emit('countdown', '===========================')
    socket.emit('countdown', '===========================')
  }, 4000)
}

function nextQuestion(socket, sentence) {
  socket.broadcast.emit('countdown', '===========================')
  socket.broadcast.emit('countdown', 'GET READY FOR THE NEXT ROUND...')
  socket.broadcast.emit('countdown', '===========================')
  socket.emit('countdown', '===========================')
  socket.emit('countdown', 'GET READY FOR THE NEXT ROUND...')
  socket.emit('countdown', '===========================')
  setTimeout(() => {
    socket.broadcast.emit('countdown', '3')
    socket.emit('countdown', '3')
  }, 2000)
  setTimeout(() => {
    socket.broadcast.emit('countdown', '2')
    socket.emit('countdown', '2')
  }, 3000)
  setTimeout(() => {
    socket.broadcast.emit('countdown', '1')
    socket.emit('countdown', '1')
  }, 4000)
  setTimeout(() => {
    socket.broadcast.emit('countdown', '===========================')
    socket.broadcast.emit('countdown', sentence)
    socket.broadcast.emit('countdown', '===========================')
    socket.emit('countdown', '===========================')
    socket.emit('countdown', sentence)
    socket.emit('countdown', '===========================')
  }, 5000)
}

console.log('SERVER UP AND RUNNING!!')