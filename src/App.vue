<template>
  <Home></Home>
</template>

<script>
import Home from './layout/Home';

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style lang="scss">
  *, *::before, *::after {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    font-size: 100%; // defining 1rem = 16px for desktop

    @media only screen and (max-width: 90em) {
      font-size: 62.5%; // defining 1rem = 10px
    }

    @media only screen and (max-width: 56em) { // about 900px
      font-size: 50%; // defining 1rem = 8px
    }
  }

  p {
    margin-bottom: 0; //counter default style of 1rem margin btm
  }

  .btn {
    outline: none;
    cursor: pointer;
    border: none;
  }

  #app {
    position: relative; // for abs positioning of child .app-container
    height: 100vh; // because child is set as position absolute, needs a height
    background: #FFAFBD;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #ffc3a0, #FFAFBD);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #ffc3a0, #FFAFBD); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    font-family: 'Vollkorn', serif;
  }
  
  // for transition-group tag "global" styles for cards
  .card-transition-enter-active {
    transition: all .7s;
  }

  .card-transition-enter-from {
    opacity: 0;
  }

  .card-transition-enter-from {
    transform: translateY(2rem);
  }
</style>
