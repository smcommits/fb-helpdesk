const conversationReducer = (state = [], action) => {
  switch (action.type) {
    case ('ADD_CONVERSATION'):
      return [...state, action.payload];
    case ('ADD_MESSAGE'):
      return action.payload;
    default:
      return state;
  }
};

const addMessages = (message, senderInfo = {}) => {
  const thunkFunction = (dispatch, getState) => {
    const { conversations } = getState();
    const exisitingConversation = conversations.find(
      (conversation) => conversation.id === message.message.conversation,
    );
    if (exisitingConversation) {
      const payload = conversations.map((conversation) => {
        if (conversation.id === message.message.conversation) {
          conversation.messages.push(message.message);
          return conversation;
        }
        return conversation;
      });
      dispatch({ type: 'ADD_MESSAGE', payload });
    } else {
      dispatch({
        type: 'ADD_CONVERSATION',
        payload: {
          id: message.message.conversation,
          messages: [message.message],
          senderInfo,
        },
      });
    }
  };
  return thunkFunction;
};

const addComment = (message, senderInfo = {}) => {
  const thunkFunction = (dispatch, getState) => {
    const { conversations } = getState();
    const exisitingConversation = conversations.find(
      (conversation) => conversation.postID === message.postID
      && conversation.senderID === message.senderPSID,
    );

    if (exisitingConversation) {
      const payload = conversations.map((conversation) => {
        if (conversation.postID === message.postID
          && conversation.senderID === message.senderPSID) {
          conversation.messages.push(message.message);
          return conversation;
        }
        return conversation;
      });
      dispatch({ type: 'ADD_MESSAGE', payload });
    } else {
      dispatch({
        type: 'ADD_CONVERSATION',
        payload: {
          id: message.message.conversation,
          messages: [message.message],
          senderInfo,
          postID: message.postID,
          senderID: senderInfo.id,
          type: message.type,
          permalink: message.permalink,
        },
      });
    }
  };
  return thunkFunction;
};

export { conversationReducer, addMessages, addComment };
