<template>
    <Header></Header>
    <Main v-bind="$attrs"></Main>
    <Footer></Footer>
</template>

<script>
    import Footer from './Footer';
    import Header from './Header';
    import Main from './Main';
    
    import Dexie from 'dexie';

    export default {
        components: {
            Header,
            Footer,
            Main
        },
        computed: {
            storeCardIsDragged() {
                return this.$store.getters.getDragStatus;
            },
            storeCards() {
                // for deep copy of the array (else the nested card objects will have the proxy wrapper)
                return JSON.parse(JSON.stringify(this.$store.getters.allCards));
            },
            storeCategories() {
                return JSON.parse(JSON.stringify(this.$store.getters.getCategories));
            }
        },
        mounted() {
            console.log('component mounted');
            const db = new Dexie('kanbanDB');
            db.version(1).stores({
                state: 'id, cardIsDragged, cards, categories'
            });
            
            window.addEventListener('load', async (e) => {
                // if page is loaded/reloaded, get data
                const initialState = await db.state.get('state');
                console.log(initialState);
                this.$store.dispatch('setInitialState', initialState);
            });

            window.addEventListener('pagehide', async (e) => {
                let response;
                const currentState = {
                    id: "state", //primary_key identifier for get/put operation
                    cardIsDragged: this.storeCardIsDragged,
                    cards: this.storeCards,
                    categories: this.storeCategories
                }
                
                try {
                    response = await db.state.put(currentState);
                } catch (error) {
                    console.log(error);
                }
            });

            document.addEventListener('visibilitychange', async (e) => {
                if (document.visibilityState === 'hidden') { // if page navigated away (change tabs, close page, reload etc), put data
                    let response;
                    const currentState = {
                        id: "state", //primary_key identifier for get/put operation
                        cardIsDragged: this.storeCardIsDragged,
                        cards: this.storeCards,
                        categories: this.storeCategories
                    }
                    
                    try {
                        response = await db.state.put(currentState);
                    } catch (error) {
                        console.log(error);
                    }
                }
            });
        },
    }
</script>

<style lang="scss" scoped>

</style>