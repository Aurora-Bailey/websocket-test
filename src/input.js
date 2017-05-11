import state from './state'
import socket from './socket'
import Schema from '../Schema.js'

window.addEventListener('mousemove', function (e) {
  state.input.mouse.x = e.clientX
  state.input.mouse.y = e.clientY

  socket.sendBinary(Schema.pack({s: 'mouse', x: e.clientX, y: e.clientY}))
})
