<template>
    <div class="app-container">
        <Header></Header>
        <Main></Main>
        <Footer></Footer>
    </div>
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
    .app-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 90vh;
        width: 90vw;
        background-color:#FFFAFA;
        // padding: 5px;
        border: 1px solid rgba(#eeeeee, 1);
        border-radius: 1.5rem;
        box-shadow: 0 0 2rem rgba(0,0,0, .5);
    }
</style>