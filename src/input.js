import state from './state'

window.addEventListener('mousemove', function (e) {
  state.input.mouse.x = e.clientX
  state.input.mouse.y = e.clientY
})
