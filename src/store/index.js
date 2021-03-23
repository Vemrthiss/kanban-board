import { createStore } from 'vuex'

export default createStore({
  state: {
    cardIsDragged: false,
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
      }
    ],
    categories: [], // an ordered list of strings? (order defines render order)
  },
  mutations: {
    setDragStatus(state, status) { //status is a boolean
      state.cardIsDragged = status;
    },
    addNewCard(state, cardObj) {
      state.cards.push(cardObj);
    },
    removeCardById(state, id) {
      state.cards = state.cards.filter(card => card.id !== id);
    },
    addNewCategory(state, newCategory) {
      state.categories.push(newCategory);
    },
    removeCategory(state, categoryToRemove) {
      state.categories = state.categories.filter(category => category !== categoryToRemove);
    },
    changeCardCategory(state, changeConfig) {
      const {id, newCategory} = changeConfig;
      const cardsCopy = [...state.cards]; //shallow copy of cards state (a list)
      const cardIndex = state.cards.findIndex(card => card.id === id);
      const cardToUpdate = {...state.cards[cardIndex]}; //shallow copy of the card object in the cards list state to update
      cardToUpdate['category'] = newCategory;
      cardsCopy[cardIndex] = cardToUpdate;
      state.cards = cardsCopy; //update state
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
    },
    addNewCategory(context, newCategory) {
      context.commit('addNewCategory', newCategory);
    },
    removeCategory(context, categoryToRemove) {
      context.commit('removeCategory', categoryToRemove);
    },
    changeCardCategory(context, changeConfig) {
      //changeConfig is an object with 2 properties: id of the card and the newCategory
      context.commit('changeCardCategory', changeConfig);
    }
  },
  getters: {
    getDragStatus: state => state.cardIsDragged,
    allCards: state => state.cards,
    getNullCards: state => {
      return state.cards.filter(card => card.category === '');
    },
    getCardsByCategory: state => category => {
      return state.cards.filter(card => card.category === category);
    },
    getCategories: state => state.categories
  }
})
