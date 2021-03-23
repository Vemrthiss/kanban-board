<template>
    <div class="board-category"
         @dragenter.prevent="cardWithin"
         @dragover.prevent="cardWithin"
         @dragleave.prevent="cardOutside"
         @drop.prevent="cardDropped">
        <p>{{categoryObj.categoryTitle}}</p>

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
            allCards() {
                return this.$store.getters.allCards;
            },
            validCards() { //a list of card objects in that category
                return this.$store.getters.getCategoryCards(this.categoryObj.categoryTitle);
            }
        },
        props: {
            categoryObj: Object
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

                const targetedCard = this.allCards.find(cardObj => cardObj.id === id);

                const addConfig = {
                    categoryTitle: this.categoryObj.categoryTitle,
                    cardObj: targetedCard
                }
                this.$store.dispatch('addCardToCategory', addConfig); //adds card 

                const removeConfig = {
                    categoryTitle: targetedCard.category, //the card's old category before changing it in the store below
                    cardObj: targetedCard
                }
                this.$store.dispatch('removeCardFromCategory', removeConfig); //removes card from old category
                this.cardOverCategory = false; //resets card over category status

                const changeConfig = {
                    id: id,
                    newCategory: this.categoryObj.categoryTitle, //from props
                }
                console.log(changeConfig);
                this.$store.dispatch('changeCardCategory', changeConfig);
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