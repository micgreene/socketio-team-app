'use strict';

require('dotenv').config();
const PORT = process.env.PORT || 3000;
const io = require('socket.io')(PORT);

io.on('connection', (socket) => {
  console.log(`${socket.id} HAS CONNECTED!`);

  socket.on('message', payload => {
    let sentence = 'the quick brown fox jumps over the lazy dog'
    if (payload.text.split('\n')[0] === 'start') {
      // start game with random sentence
      startGame(socket, sentence, payload);
    } 

    if (payload.text.split('\n')[0] === sentence) {
      // stop game and display winner
      // console.log('someone won')
      socket.broadcast.emit('winner', payload)
      socket.emit('winner', payload)
    }
    console.log(`THIS IS USUAL LISTENER MESSAGE IS: ${payload.text}`)
    socket.broadcast.emit('message', payload)
    socket.emit('message', payload)
  })

})

function startGame(socket, sentence, payload) {
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
    socket.broadcast.emit('countdown', sentence)
    socket.emit('countdown', sentence)
  }, 4000)
}

console.log('SERVER UP AND RUNNING!!')