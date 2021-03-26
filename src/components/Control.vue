<template>
    <div class="main__control"
         @dragenter.prevent="cardWithin"
         @dragover.prevent="cardWithin"
         @dragleave.prevent="cardOutside"
         @drop.prevent="cardDropped">
        <form action="" class="main__control-add">
            <input type="text" name="new-card-title" placeholder="Add a new card" v-model="newCardTitle" class="main__input main__control-input">
            <AddBtn @new-card-submitted="submitNewCard" :customClass="'add-card'"></AddBtn>
        </form>
        
        <div class="main__control-cards">
            <transition-group name="card-transition">
                <Card v-for="card of nullCards" :key="card.id" :cardDetails="card"></Card>
            </transition-group>
        </div>
    </div>
</template>

<script>
    import { v4 as uuidv4 } from 'uuid';

    import AddBtn from './buttons/AddBtn';
    import Card from './cards/Card';

    export default {
        data() {
            return {
                newCardTitle: ''
            }
        },
        computed: {
            nullCards() {
                return this.$store.getters.getNullCards;
            },
            allCards() {
                return this.$store.getters.allCards;
            },
            dragged() {
                return this.$store.getters.getDragStatus;
            }
        },
        methods: {
            submitNewCard(e) {
                if (this.newCardTitle) { //checks if title is non-empty
                    const newCardObj = {
                        title: this.newCardTitle,
                        category: '',
                        id: uuidv4()
                    }

                    this.$store.dispatch('addNewCard', newCardObj);
                    this.newCardTitle = ''; //reset the input field
                }
            },
            cardWithin(e) {
                console.log('card is within control');
            },
            cardOutside(e) {
                console.log('card has left control');
            },
            cardDropped(e) {
                // delete that card when card is dropped in trashbin
                const id = e.dataTransfer.getData('text/plain');

                const targetedCard = this.allCards.find(cardObj => cardObj.id === id);
                // removes card from its previous category and refreshes that category
                const removeConfig = {
                    categoryTitle: targetedCard.category, //the card's old category before changing it in the store below
                    cardObj: targetedCard
                }
                this.$store.dispatch('removeCardFromCategory', removeConfig); //removes card from old category

                // resets the category property of the card
                const changeConfig = {
                    id: id,
                    newCategory: '',
                }
                this.$store.dispatch('changeCardCategory', changeConfig);
            }
        },
        components: {
            AddBtn,
            Card
        }
    }
</script>

<style lang="scss" scoped>
    .main__control {
        overflow-y: scroll;
    }

    .main__control-add {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin-bottom: 1rem;
    }

    .main__control-input {
        width: 80%;
    }
</style>