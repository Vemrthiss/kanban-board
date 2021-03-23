<template>
    <button class="btn btn-primary" @click.prevent="submitNewCategory">Add a new category</button>
</template>

<script>
    export default {
        emits: ['newCategorySubmitted'],
        methods: {
            submitNewCategory(e) {
                this.$emit('newCategorySubmitted');
            }
        },
    }
</script>

<style lang="scss" scoped>
    
</style>