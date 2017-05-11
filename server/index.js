const WebSocket = require('ws');
const Schema = require('../Schema.js')

const wss = new WebSocket.Server({ port: 8000 })

wss.on('connection', (ws) => {
  ws.on('error', (err) => {
    console.log('Bad connection!')
    console.log(err)
  })
  ws.on('message', (data) => {
    try {
      if (typeof data === 'string') {
        receiveObj(ws, JSON.parse(data))
      } else {
        var buf = new Buffer(data, 'binary')
        receiveObj(ws, Schema.unpack(buf))
      }
    } catch (err) {
      console.log('Bad packet!')
      console.log(err)
    }
  });
  ws.on('close', () => {
    console.log('Connection close')
  })

  console.log('Connection open')
  ws.send(JSON.stringify({a: 'something'}))
});

function broadcast (obj) {
  wss.clients.forEach((ws) => {
    sendObj(ws, obj);
  });
}

function sendObj (ws, obj) {
  if (ws.readyState !== 1) return false // Connection not open

  try {
    ws.send(JSON.stringify(obj));
  } catch (err) {
    console.log('Failed to send object packet!')
  }
}

function sendBinary (ws, data) {
  if (ws.readyState !== 1) return false // Connection not open

  try {
    ws.send(data, {binary: true})
  } catch (err) {
    console.log('Failed to send binary packet!')
  }
}

function receiveObj (ws, obj) {
  if (obj.s === 'mouse') {
    sendBinary(ws, Schema.pack(obj))
  }
  console.log(obj)
}

console.log('Listening on port 8000')
