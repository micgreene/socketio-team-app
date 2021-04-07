'use strict';

const io = require('socket.io-client');
const host = 'http://bc8219463191.ngrok.io';
const repl = require('repl');
const chalk = require('chalk')
const socket = io.connect(host);
const username = 'Jenner'

socket.on('connect', () => {
  console.log('Connected to CHATROOM')
})

socket.on('message', (payload) => {
  const text = payload.text;
  const username = payload.username;
  console.log(chalk.green(`[${username}] ${text.split('\n')[0]}`))
})

socket.on('countdown', payload => {
  console.log(payload)
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