'use strict';

const io = require('socket.io-client');
const host = 'http://f7d71f191a5f.ngrok.io';
const repl = require('repl');
const chalk = require('chalk')
const socket = io.connect(host);
const username = 'Jenner'

socket.on('connect', () => {
  console.log('Connected to CHATROOM');
  socket.emit('newPlayer', username)
})

socket.on('joined', payload => {
  console.log(`${payload} has entered the game!`)
})

socket.on('clear', payload => {
  process.stdout.write('\x1B[2J');
})

socket.on('message', (payload) => {
  // process.stdout.write('\x1B ')
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
  prompt: ``,
  eval: (text) => {
    process.stdout.write('\u001b[1F');
    socket.send({text, username})
  },
})

console.log('CLIENT UP AND RUNNING!!')