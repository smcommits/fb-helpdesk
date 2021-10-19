import { combineReducers } from 'redux';
import sessionReducer from './session';
import { conversationReducer } from './conversation';
import pageReducer from './page';

const rootReducer = combineReducers({
  currentUser: sessionReducer,
  conversations: conversationReducer,
  page: pageReducer,
});

export default rootReducer;
