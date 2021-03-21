import { createStore } from 'vuex'

export default createStore({
  state: {
    inDragMode: false,
    cards: [ //an array of card objects
      {
        title: 'Math quiz',
        category: '',
        id: '1' //id to be a string
      },
      {
        title: 'Physics homework',
        category: '',
        id: '2'
      },
      {
        title: 'Design',
        category: 'urgent',
        id: '3'
      }
    ]
  },
  mutations: {
    setDragStatus(state, status) { //status is a boolean
      state.inDragMode = status;
    },
    addNewCard(state, cardObj) {
      state.cards.push(cardObj);
    },
    removeCardById(state, id) {
      state.cards = state.cards.filter(card => card.id !== id);
    }
  },
  actions: {
    setDragStatus(context, status) {
      context.commit('setDragStatus', status);
    },
    addNewCard(context, cardObj) {
      context.commit('addNewCard', cardObj);
    },
    removeCardById(context, id) {
      context.commit('removeCardById', id);
    }
  },
  getters: {
    getDragStatus: state => state.inDragMode,
    allCards: state => state.cards,
    getNullCards: state => {
      return state.cards.filter(card => card.category === '');
    },
    getCardsByCategory: state => category => {
      return state.cards.filter(card => card.category === category);
    }
  }
})
