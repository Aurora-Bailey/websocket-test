import state from './state'
import Schema from '../Schema.js'

var ws = {}
var sendQueue = []
state.socket.alive = false

function start () {
  console.log('Start WebSocket')
  if (state.socket.alive) return false // Already connected

  ws = new window.WebSocket('ws://54.224.146.148/')
  ws.binaryType = 'arraybuffer'

  ws.onopen = () => {
    state.socket.alive = true

    sendObj({s: 'hi'})

    sendQueue.forEach((e, i) => {
      sendObj(e)
    })
  }

  ws.onmessage = (message) => {
    let data = message.data
    if (typeof data === 'string') {
      receiveObj(JSON.parse(data))
    } else {
      var buf = new Buffer(data, 'binary')
      receiveObj(Schema.unpack(buf))
    }
  }

  ws.onclose = () => {
    state.socket.alive = false
  }
}

function end () {
  if (!state.socket.alive) return false
  ws.close()
}

function sendObj (obj, queue = false) {
  if (!state.socket.alive) {
    if (queue)
      sendQueue.push(obj)
    else
      console.warn('Game server is not connected.')
  } else {
    ws.send(JSON.stringify(obj))
  }
}

function shortObj (obj) {
  receiveObj(obj)
}

function sendBinary (binary) {
  if (!state.socket.alive) {
    console.warn('WebSocket is not connected.')
  } else {
    ws.send(binary, { binary: true, mask: true })
  }
}

function receiveObj (obj) {
  console.log(obj)
  if (obj.s === 'ping') {
    state.game.ping = Date.now() - obj.v
    console.log('obj')
  }
  if (obj.s === 'mouse') {
    state.remote.square.x = obj.x
    state.remote.square.y = obj.y - 58
    return true
  }
  if (obj.s === 'circle') {
    state.remote.circle.x = obj.x
    state.remote.circle.y = obj.y
    return true
  }
  console.log(obj)
}

export default {start, end, sendObj, shortObj, sendBinary}
