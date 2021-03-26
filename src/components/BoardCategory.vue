<template>
    <div class="board-category" :class="{'board-category--hovered': cardOverCategory}"
         @dragenter.prevent="cardWithin"
         @dragover.prevent="cardWithin"
         @dragleave.prevent="cardOutside"
         @drop.prevent="cardDropped">
        <div class="board-category__header">
            <!-- <button class="board-cateogry__move board-category__move--left" @click="moveCategory">Left</button> -->
            <p class="board-category__title">{{categoryTitle}}</p>
            <BtnDanger @click="deleteCategory" :customClass="'board-category__delete-btn'">Delete Category</BtnDanger>
            <!-- <button class="board-cateogry__move board-category__move--right" @click="moveCategory">right</button> -->
        </div>
        

        <div class="board-cards">
            <transition-group name="card-transition">
                <Card v-for="card of validCards" :key="card.id" :cardDetails="card"></Card>
            </transition-group>
        </div>
    </div>
</template>

<script>
    import Card from './cards/Card';
    import BtnDanger from './buttons/BtnDanger';

    export default {
        data() {
            return {
                cardOverCategory: false,
            }
        },
        computed: {
            categoryTitle() {
                return this.categoryObj.categoryTitle;
            },
            allCards() {
                return this.$store.getters.allCards;
            },
            validCards() { //a list of card objects in that category
                return this.$store.getters.getCategoryCards(this.categoryTitle);
            }
        },
        props: {
            categoryObj: Object
        },
        methods: {
            deleteCategory(e) {
                this.$store.dispatch('removeCategory', this.categoryTitle);
            },
            // moveCategory(e) { //to dispatch actions to move category along the list (categories at ends only can move in the other direction)
            //     if (e.target.classList.contains('board-category__move--left')) { //move category to left
            //         console.log('left');
            //     } else {
            //         console.log('right');
            //     }
            // },
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

                let targetedCard = this.allCards.find(cardObj => cardObj.id === id);
                const oldCategory = targetedCard.category;

                // update category of the card object
                const changeConfig = {
                    id: id,
                    newCategory: this.categoryTitle, //from props-> computed
                }
                console.log(changeConfig);
                this.$store.dispatch('changeCardCategory', changeConfig);

                // get the updated card object AFTER updating it
                targetedCard = this.allCards.find(cardObj => cardObj.id === id);

                // remove card from old category
                const removeConfig = {
                    categoryTitle: oldCategory, //the card's old category before changing it in the store below
                    cardObj: targetedCard
                }
                this.$store.dispatch('removeCardFromCategory', removeConfig); //removes card from old category

                // add card to new category
                const addConfig = {
                    categoryTitle: this.categoryTitle,
                    cardObj: targetedCard
                }
                this.$store.dispatch('addCardToCategory', addConfig); //adds card 
                
                this.cardOverCategory = false; //resets card over category status
            },
            test(e) {
                console.log('clicked');
            }
        },
        components: {
            Card,
            BtnDanger
        }
    }
</script>

<style lang="scss" scoped>
    .board-category {
        width: 15vw;
        border: 1.5px solid #ff8095;
        border-radius: 1rem;
        text-align: center;
        margin-right: 2rem;
        transition: all .3s;

        &--hovered {
            border: 2px solid #ff1a40;
            transform: scale(1.02);
        }

        &__header {
            margin: 1rem 0;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 1rem;
            padding-top: 0;
            border-bottom: 1px solid #eeeeee;
            // position: relative; // for abs positioning of left/right btns
        }

        &__title {
            margin: 0;
            margin-right: 1.5rem;
            font-size: 1.6rem;
            letter-spacing: .4px;
            width: 60%;
        }

        &__delete-btn {
            width: 40%;
            font-size: 1.2rem;
        }

        // &__move {
        //     position: absolute;
        // }
    }

    .board-cards {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>