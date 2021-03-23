<template>
    <div class="main">
        <Board></Board>
        <Control></Control>
    </div>
</template>

<script>
    import Board from '../components/Board';
    import Control from '../components/Control'

    export default {
        components: {
            Board,
            Control
        }
    }
</script>

<style lang="scss" scoped>
    .main {
        height: 80vh; //testing
        display: grid;
        grid-template-columns: 85% 1fr;
        gap: 1rem;
        padding: 0 1rem;
    }
</style>