<template>
    <div class="header">
        <h1 class="header__main">Kanban Board</h1>
        <p class="header__sub">Visualise Your Commitments</p>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    .header {
        height: 10%;
        text-align: center;
        padding-top: 5px;

        &__main {
            font-weight: 700;
            font-size: 2.6rem;
            margin: 0;
        }

        &__sub {
            font-size: 1.4rem;
        }
    }
</style>