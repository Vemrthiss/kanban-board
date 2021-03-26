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

<style lang="scss">
    .main {
        height: 82.5%; //testing
        display: grid;
        grid-template-columns: 80% 1fr;
        gap: 1rem;
        padding: 0 1rem;

        &__input {
            border-radius: 1rem;
            border: 2.5px solid #ff1a40;
            padding: .4rem 1rem;
            font-size: 1.2rem;
            outline: none;
            transition: border .3s;

            &:placeholder-shown {
                border: 2px solid #ff8095;
            }
        }
    }
</style>