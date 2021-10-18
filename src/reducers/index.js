import { combineReducers } from 'redux';
import sessionReducer from './session';
import { conversationReducer } from './conversation';

const rootReducer = combineReducers({
  currentUser: sessionReducer,
  conversations: conversationReducer,
});

export default rootReducer;
