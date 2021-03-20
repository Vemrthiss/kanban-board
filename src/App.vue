<template>
  <Home></Home>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Home from './layout/Home';

export default {
  name: 'App',
  components: {
    HelloWorld,
    Home
  }
}
</script>

<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   margin-top: 60px;
// }
  *, *::before, *::after {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%; // defining 1rem = 10px
  }
</style>
