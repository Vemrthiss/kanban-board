<template>
    <div class="card" :class="customClass" draggable="true" @dragstart="dragCard" @dragend="stopDragCard">
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
            customClass: String
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
    // @keyframes pulsate {
    //     0% {
    //         transform: scale(1);
    //         box-shadow: none;
    //     }
        
    //     50% {
    //         transform: scale(1.05);
    //         box-shadow: 0 1rem 4rem rgba(0,0,0, 0.25);
    //     }

    //     100% {
    //         transform: scale(1);
    //         box-shadow: none;
    //     }
    // }

    .card {
        cursor: grab;
        border: 1px solid rgba(#eeeeee, .6);
        border-radius: 1rem;
        width: 95%;
        background-color: #ffccd5;
        text-align: center;
        font-size: 1.4rem;

        // &:hover {
        //     // transform: scale(1.02);
        //     //animation: pulsate 1s infinite;
        // }

        &--dragged {
            display: none; //hide the original card while dragging
            cursor: grabbing; //doesnt work
        }

        &:not(:last-child) {
            margin-bottom: 1rem;
        }
    }
</style>