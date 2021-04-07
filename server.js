'use strict';

require('dotenv').config();
const PORT = process.env.PORT || 3000;
const io = require('socket.io')(PORT);

io.on('connection', (socket) => {
  console.log(`${socket.id} HAS CONNECTED!`);

  socket.on('message', payload => {
    console.log(`THIS IS USUAL LISTENER MESSAGE IS: ${payload.text}`)
    socket.broadcast.emit('message', payload)
    socket.emit('message', payload)
  })

})

console.log('SERVER UP AND RUNNING!!')