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
    categories: [ // an ordered list of category objects? (order defines render order)
      // {
      //   categoryTitle: 'example',
      //   categoryCards: [] //ordered list of card objects in the category
      // }
    ], 
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
      const newCategoryObj = {
        categoryTitle: newCategory,
        categoryCards: []
      }

      state.categories.push(newCategoryObj);
    },
    removeCategory(state, categoryToRemove) {
      state.categories = state.categories.filter(categoryObj => categoryObj.categoryTitle !== categoryToRemove);
    },
    changeCardCategory(state, changeConfig) {
      const {id, newCategory} = changeConfig;
      const cardsCopy = [...state.cards]; //shallow copy of cards state (a list)
      const cardIndex = state.cards.findIndex(card => card.id === id);
      const cardToUpdate = {...state.cards[cardIndex]}; //shallow copy of the card object in the cards list state to update
      cardToUpdate['category'] = newCategory;
      cardsCopy[cardIndex] = cardToUpdate;
      state.cards = cardsCopy; //update state
    },
    addCardToCategory(state, addConfig) {
      const {categoryTitle, cardObj} = addConfig;
      // right now card is being pushed to the category card list, but in future should implement specific index based adding
      const targetCategoryObjIndex = state.categories.findIndex(categoryObj => categoryObj.categoryTitle === categoryTitle);
      const targetCategoryObj = state.categories[targetCategoryObjIndex];
      targetCategoryObj.categoryCards.push(cardObj);
      state.categories[targetCategoryObjIndex] = targetCategoryObj;
    },
    removeCardFromCategory(state, removeConfig) {
      const {categoryTitle, cardObj} = removeConfig;
      if (categoryTitle) { //makes sure categoryTitle has sth and not an empty string (which means comes from control)
         // right now card is being pushed to the category card list, but in future should implement specific index based adding
        const targetCategoryObjIndex = state.categories.findIndex(categoryObj => categoryObj.categoryTitle === categoryTitle);
        const targetCategoryObj = state.categories[targetCategoryObjIndex];
        const updatedCategoryCards = targetCategoryObj.categoryCards.filter(card => card.id !== cardObj.id);
        targetCategoryObj.categoryCards = updatedCategoryCards; 
        state.categories[targetCategoryObjIndex] = targetCategoryObj;
      }
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
    },
    addCardToCategory(context, addConfig) {
      context.commit('addCardToCategory', addConfig);
    },
    removeCardFromCategory(context, removeConfig) {
      context.commit('removeCardFromCategory', removeConfig);
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
    getCategories: state => state.categories,
    getCategoryCards: state => categoryTitle => {
      const targetCategoryObj = state.categories.find(categoryObj => categoryObj.categoryTitle === categoryTitle);
      return targetCategoryObj.categoryCards;
    }
  }
})
