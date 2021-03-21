<template>
    <div class="main__control">
        <p>{{dragged}}</p>
        <button @click="getState">Get state</button>
        <form action="" class="main__control-add">
            <input type="text" name="new-card-title" placeholder="Add a new card" v-model="newCardTitle">
            <AddCard @new-card-submitted="submitNewCard"></AddCard>
        </form>
        
        <div class="main__control-cards">
            <Card v-for="card of nullCards" :key="card.id" :cardDetails="card"></Card>
        </div>
    </div>
</template>

<script>
    import { v4 as uuidv4 } from 'uuid';

    import AddCard from './buttons/AddCardBtn';
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
            dragged() {
                return this.$store.getters.getDragStatus;
            }
        },
        methods: {
            getState(e) { //testing
                console.log(this.$store.state);
            },
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
            }
        },
        components: {
            AddCard,
            Card
        }
    }
</script>

<style lang="scss" scoped>
    .main__control {
        overflow-y: scroll;
    }
</style>