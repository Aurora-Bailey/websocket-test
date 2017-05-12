const WebSocket = require('ws');
const Schema = require('../Schema.js')

const wss = new WebSocket.Server({ port: 8000 })


let frame = 0
let circle = {x: 0, y: 0}
let speed = 150
let fps = 120

function GameLoop () {
  setTimeout(() => {GameLoop()}, 1000 / 120)

  if (frame % (120 / fps) === 0) {
    circle.x = Math.cos(frame / speed) * 100 + 350
    circle.y = Math.sin(frame / speed) * 100 + 150
    wss.clients.forEach((ws) => {
      sendBinary(ws, Schema.pack({s: 'circle', x: parseInt(circle.x), y: parseInt(circle.y)}))
    });
  }

  frame++
}
GameLoop()


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
  ws.send(JSON.stringify({s: 'hi'}))
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
    return true
  }
  if (obj.s === 'ping') {
    sendBinary(ws, Schema.pack(obj))
    return true
  }
  if (obj.s === 'speed') {
    speed = obj.v
  }
  if (obj.s === 'fps') {
    fps = obj.v
  }
  if (obj.s === 'frame') {
    frame = obj.v
  }
  console.log(obj)
}

console.log('Listening on port 8000')
