import { combineReducers } from 'redux';
import sessionReducer from './session';

const rootReducer = combineReducers({
  currentUser: sessionReducer,
});

export default rootReducer;
