<template>
    <div class="card" draggable="true" @dragstart="dragCard" @dragend="stopDragCard">
        <div class="card-body">
            <p>{{ cardDetails.title }}</p>
        </div>
    </div>
</template>

<script>
    // changing cursor to grabbing when being dragged does not work???

    export default {
        data() {
            return {
                dragStatus: false
            }
        },
        props: {
            cardDetails: Object,
        },
        methods: {
            setDragStatus(status) {
                this.dragStatus = status;
                this.$store.dispatch('setDragStatus', this.dragStatus);
            },
            dragCard(e) {
                this.setDragStatus(true);
                e.dataTransfer.setData('text/plain', this.cardDetails.id);
                setTimeout(() => { //to enable the dragging of the card and hiding its original position
                    e.target.classList.add('card--dragged');
                }, 0);
            },
            stopDragCard(e) {
                this.setDragStatus(false);
                setTimeout(() => {
                    if (e.target) {
                        e.target.classList.remove('card--dragged');
                    }
                }, 0);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .card {
        cursor: grab;

        &--dragged {
            display: none; //hide the original card while dragging
            cursor: grabbing; //doesnt work
        }
    }
</style>