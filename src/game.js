import state from './state'

function GameLoop () {
  setTimeout(() => {GameLoop()}, 1000 / 120)

  if (state.game.frame % (120 /state.game.fps) === 0) {
    state.local.circle.x = Math.cos(state.game.frame / state.game.speed) * 100 + 150
    state.local.circle.y = Math.sin(state.game.frame / state.game.speed) * 100 + 150

    state.local.square.x = state.input.mouse.x - 58
    state.local.square.y = state.input.mouse.y
  }

  state.game.frame++
}
GameLoop()
