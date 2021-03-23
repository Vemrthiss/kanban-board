<template>
    <div class="footer">
        <div class="footer__text">
            <p class="footer__text-content">Copyright &copy; Joel Tay</p>
        </div>

        <div class="footer__delete-card"
             :class="{'footer__delete-card--revealed': cardIsDragged}"
             @dragenter.prevent="cardWithin"
             @dragover.prevent="cardWithin"
             @dragleave.prevent="cardOutside"
             @drop.prevent="cardDropped">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash footer__icon footer__icon-rubbish" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg>
            <p class="footer__delete-card-text" :style=" cardOverTrash ? {opacity: 1} : '' ">Move to trash</p>
        </div>

        <div class="footer__icon-group">
            <a class="footer__icon footer__icon-github" :href="githubLink">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-github" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
                </svg>
            </a>

            <a class="footer__icon footer__icon-email" :href="emailLink">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mail" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <polyline points="3 7 12 13 21 7" />
                </svg>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                githubLink: "https://github.com/Vemrthiss/kanban-board",
                emailLink: "mailto:joeltwh1999@gmail.com",
                cardOverTrash: false
            }
        },
        computed: {
            allCards() {
                return this.$store.getters.allCards;
            },
            cardIsDragged() {
                return this.$store.getters.getDragStatus;
            }
        },
        methods: {
            cardWithin(e) {
                this.cardOverTrash = true;
                console.log('card is within boundary');
            },
            cardOutside(e) {
                this.cardOverTrash = false;
                console.log('card has left boundary');
            },
            cardDropped(e) {
                // delete that card when card is dropped in trashbin
                console.log('card is dropped');
                const id = e.dataTransfer.getData('text/plain');
                console.log(id);
                
                const targetedCard = this.allCards.find(cardObj => cardObj.id === id);
                // removes card from its previous category and refreshes that category
                console.log(targetedCard);
                const removeConfig = {
                    categoryTitle: targetedCard.category, //the card's old category before changing it in the store below
                    cardObj: targetedCard
                }
                this.$store.dispatch('removeCardFromCategory', removeConfig); //removes card from old category

                // removes card from the entire store
                this.$store.dispatch('removeCardById', id);
                this.cardOverTrash = false; //resets card over trash status
            }
        }
    }
</script>

<style lang="scss" scoped>
    .footer {
        height: 10vh; //testing
        display: flex;
        justify-content: space-between;
        position: relative; //for abs positioning of rubbish icon
        padding: 0 1.5rem;

        &__icon-group {
            display: flex;
        }

        &__icon {
            transition: all .3s;
            cursor: pointer;
            height: 4rem;
            width: 4rem;

            &:hover {
                transform: scale(1.1);
            }
        }

        &__delete-card {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            display: none;

            &--revealed {
                display: block;
            }
        }

        &__delete-card-text {
            position: absolute;
            left: 50%;
            bottom: -2rem;
            width: max-content;
            transform: translateX(-50%);
            opacity: 0;
            transition: opacity .3s;
        }
    }
</style>