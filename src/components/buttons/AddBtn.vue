<template>
    <button class="btn btn-add" @click.prevent="submitNewStuff" :class="customClass">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus btn-add__icon" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
    </button>
</template>

<script>
    export default {
        props: {
            customClass: String,
        },
        emits: ['newCategorySubmitted', 'newCardSubmitted'],
        methods: {
            submitNewStuff(e) {
                if (this.customClass === 'add-card') {
                    this.$emit('newCardSubmitted');
                } else {
                    this.$emit('newCategorySubmitted');
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .btn-add {
        cursor: pointer;
        border-radius: 50%;
        background-color: #ff8095;
        padding: .25rem;
        margin-left: 1rem;
        transition: transform .3s;

        &:hover {
            transform: scale(1.1);
        }

        &__icon {
            height: 2.2rem;
            width: 2.2rem;
            stroke: white;
        }
    }
</style>