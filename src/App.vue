<template>
  <div id="app">
    <div class="toolbar">
      <button @click="circleSpeed()">Circle Speed {{$root.state.game.circle.speed}}</button>
      <button @click="fps()">fps {{$root.state.game.fps}}</button>
    </div>
    <div class="box" :style="{ top: $root.state.input.mouse.y + 'px', left: $root.state.input.mouse.x + 'px'}"></div>
    <div class="circle" :style="{ top: $root.state.game.circle.y + 'px', left: $root.state.game.circle.x + 'px'}"></div>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    circleSpeed () {
      this.$root.state.game.circle.speed /= 2
      if(this.$root.state.game.circle.speed < 1) this.$root.state.game.circle.speed = 150
    },
    fps () {
      this.$root.state.game.fps /= 2
      if(this.$root.state.game.fps < 3) this.$root.state.game.fps = 120
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
.box {
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
