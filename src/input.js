import state from './state'
import socket from './socket'
import Schema from '../Schema.js'

let realtime = {}
realtime.mouse = {
  x: 0,
  y: 0,
  left: false,
  right: false
}
let sentPosition = {x: 0, y: 0}

window.addEventListener('mousemove', function (e) {
  realtime.mouse.x = e.clientX
  realtime.mouse.y = e.clientY
  state.ref.square.x = e.clientX
  state.ref.square.y = e.clientY
})

function polling () {
  setTimeout(() => {polling()}, 1000 / state.game.polling)

  state.input.mouse.x = realtime.mouse.x
  state.input.mouse.y = realtime.mouse.y

  if (sentPosition.x === realtime.mouse.x && sentPosition.y === realtime.mouse.y) return false // no change
  sentPosition.x = realtime.mouse.x
  sentPosition.y = realtime.mouse.y
  socket.sendBinary(Schema.pack({s: 'mouse', x: realtime.mouse.x, y: realtime.mouse.y}))
}
polling()
