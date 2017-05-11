import state from './state'

var ws = {}
var sendQueue = []
state.socket.alive = false

function start () {
  console.log('Start WebSocket')
  if (state.socket.alive) return false // Already connected

  ws = new window.WebSocket('ws://localhost:8000')
  ws.binaryType = 'arraybuffer'

  ws.onopen = () => {
    state.socket.alive = true

    sendObj({a: 'hi'})

    sendQueue.forEach((e, i) => {
      sendObj(e)
    })
  }

  ws.onclose = () => {
    state.socket.alive = false
  }

  ws.onmessage = (e) => {
    if (typeof e.data === 'string') {
      receiveObj(JSON.parse(e.data))
    } else {
      // var buf = new Buffer(e.data, 'binary')
      // receiveObj(Schema.unpack(buf))
    }
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
}

export default {start, end, sendObj, shortObj, sendBinary}
