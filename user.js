'use strict';

const io = require('socket.io-client');
const host = 'http://b86c1dbb8dd8.ngrok.io';
const repl = require('repl');
const chalk = require('chalk')
const socket = io.connect(host);
const username = 'MKG'

socket.on('connect', () => {
  console.log('Connected to CHATROOM')
})

socket.on('message', (payload) => {
  const text = payload.text;
  const username = payload.username;
  console.log(chalk.green(`[${username}] ${text.split('\n')[0]}`))
})

repl.start({
  prompt: '> ',
  eval: (text) => {
    socket.send({text, username})
  }
})

console.log('CLIENT UP AND RUNNING!!')