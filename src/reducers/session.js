const sessionReducer = (state = {}, action) => {
  switch (action.type) {
    case ('SET_CURRENT_USER_TRUE'):
      return action.payload;
    default:
      return state;
  }
};

export default sessionReducer;
