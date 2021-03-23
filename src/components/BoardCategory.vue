<template>
    <div class="board-category"
         @dragenter.prevent="cardWithin"
         @dragover.prevent="cardWithin"
         @dragleave.prevent="cardOutside"
         @drop.prevent="cardDropped">
        <p>{{category}}</p>

        <div class="board-cards">
            <Card v-for="card of validCards" :key="card.id" :cardDetails="card"></Card>
        </div>
    </div>
</template>

<script>
    import Card from './cards/Card';

    export default {
        data() {
            return {
                cardOverCategory: false
            }
        },
        computed: {
            validCards() {
                return this.$store.getters.getCardsByCategory(this.category);
            }
        },
        props: {
            category: String
        },
        methods: {
            cardWithin(e) {
                this.cardOverCategory = true;
                console.log('card is within boundary');
            },
            cardOutside(e) {
                this.cardOverCategory = false;
                console.log('card has left boundary');
            },
            cardDropped(e) {
                // change the card's category when that card when card is dropped in the respective regions
                console.log('card is dropped');
                const id = e.dataTransfer.getData('text/plain');

                const changeConfig = {
                    id: id,
                    newCategory: this.category, //from props
                }
                console.log(changeConfig);
                this.$store.dispatch('changeCardCategory', changeConfig);
                this.cardOverCategory = false; //resets card over trash status
            }
        },
        components: {
            Card
        }
    }
</script>

<style lang="scss" scoped>
    .board-category {
        width: 15vw;
        border: 1px solid black;
        text-align: center;
    }
</style>