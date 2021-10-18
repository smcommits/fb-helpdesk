const conversationReducer = (state = [], action) => {
  switch (action.type) {
    case ('NEW_CONVERSATION'):
      return [...state, action.payload];
    case ('ADD_MESSAGE'):
      return action.payload;
    default:
      return state;
  }
};

export { conversationReducer }
