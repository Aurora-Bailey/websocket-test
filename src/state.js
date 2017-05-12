let state = {}

state.input = {}
state.input.mouse = {
  x: 150,
  y: 150,
  left: false,
  right: false
}

state.game = {}
state.game.fps = 120
state.game.polling = 480 //per second
state.game.speed = 150
state.game.frame = 0

state.local = {}
state.local.circle = {
  x: 150,
  y: 150
}
state.local.square = {
  x: 150,
  y: 150
}

state.remote = {}
state.remote.circle = {
  x: 150,
  y: 150
}
state.remote.square = {
  x: 150,
  y: 150
}

state.ref = {}
state.ref.square = {
  x: 150,
  y: 150
}

state.socket = {}
state.socket.alive = false
state.socket.ping = 100

export default state
