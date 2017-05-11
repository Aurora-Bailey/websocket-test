import state from './state'
let frame = 0

function GameLoop () {
  setTimeout(() => {GameLoop()}, 1000 / 120)

  if (frame % (120 /state.game.fps) === 0) {
    state.game.circle.x = Math.cos(frame / state.game.circle.speed) * 100 + 150
    state.game.circle.y = Math.sin(frame / state.game.circle.speed) * 100 + 150
  }


  frame++
}
GameLoop()
