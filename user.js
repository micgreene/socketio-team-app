'use strict';

const io = require('socket.io-client');
const host = 'http://7609a46ed838.ngrok.io';
const repl = require('repl');
const chalk = require('chalk')
const socket = io.connect(host);
const username = 'Someone Else'

socket.on('connect', () => {
  console.log('Connected to CHATROOM');
  socket.emit('newPlayer', username)
})

socket.on('joined', payload => {
  console.log(`${payload} has entered the game!`)
})

socket.on('message', (payload) => {
  const text = payload.text;
  const username = payload.username;
  console.log(chalk.green(`[${username}] ${text.split('\n')[0]}`))
})

socket.on('countdown', payload => {
  console.log(payload);
})

socket.on('wrong', payload => {
  console.log(`WRONG!!!!! TRY AGAIN!!!!`)
})

socket.on('round', payload => {
  console.log(`${payload.username} WON THE ROUND!!!`)
})

socket.on('winner', payload => {
  console.log(`${payload.username} WINS!!`)
})


repl.start({
  prompt: '> ',
  eval: (text) => {
    socket.send({text, username})
  }
})

console.log('CLIENT UP AND RUNNING!!')