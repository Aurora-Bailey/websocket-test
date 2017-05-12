<template>
  <div id="app">
    <div class="toolbar">
      <button @click="circleSpeed()">circle speed {{$root.state.game.speed}}</button>
      <button @click="fps()">fps {{$root.state.game.fps}}</button>
      <button @click="pollingRate()">polling {{$root.state.game.polling}}/s</button>
      <button @click="resetFrame()">reset frame</button>
    </div>
    <div class="square" :style="{ top: $root.state.local.square.y + 'px', left: $root.state.local.square.x + 'px'}"></div>
    <div class="circle" :style="{ top: $root.state.local.circle.y + 'px', left: $root.state.local.circle.x + 'px'}"></div>

    <div class="square" :style="{ top: $root.state.remote.square.y + 'px', left: $root.state.remote.square.x + 'px'}"></div>
    <div class="circle" :style="{ top: $root.state.remote.circle.y + 'px', left: $root.state.remote.circle.x + 'px'}"></div>

    <div class="square" :style="{ top: $root.state.ref.square.y + 'px', left: $root.state.ref.square.x + 'px'}"></div>
  </div>
</template>

<script>
import socket from './socket'
export default {
  name: 'app',
  methods: {
    circleSpeed () {
      this.$root.state.game.speed /= 2
      if(this.$root.state.game.speed < 1) this.$root.state.game.speed = 150
      socket.sendObj({s: 'speed', v: this.$root.state.game.speed})
    },
    fps () {
      this.$root.state.game.fps /= 2
      if(this.$root.state.game.fps < 3) this.$root.state.game.fps = 120
      socket.sendObj({s: 'fps', v: this.$root.state.game.fps})
    },
    resetFrame () {
      this.$root.state.game.frame = 0
      socket.sendObj({s: 'frame', v: 0})
    },
    pollingRate () {
      this.$root.state.game.polling /= 2
      if(this.$root.state.game.polling < 3) this.$root.state.game.polling = 480
    }
  }
}
</script>

<style>
body {
  margin: 0;
}
#app {
}
.circle {
  background-color: green;
  border: 4px solid #333;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  position: absolute;
  top: 0;
  left: 0;
}
.square {
  background-color: red;
  border: 4px solid #333;
  width: 50px;
  height: 50px;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}
</style>
