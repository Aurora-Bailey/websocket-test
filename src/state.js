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
state.game.circle = {
  x: 150,
  y: 150,
  speed: 150
}

state.socket = {}
state.socket.alive = false
state.socket.ping = 100

export default state
