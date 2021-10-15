import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import dotenv from 'dotenv';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import reportWebVitals from './reportWebVitals';
import App from './components/App';
import rootReducer from './reducers/index';
import FacebookSDK from './core/helpers/facebookAPI';

import './stylesheets/Index.scss';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(rootReducer, composedEnhancer);

const initializeApp = (loginStatus) => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App loggedIn={loginStatus} />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
  );
};

FacebookSDK.initialize().then((loginStatus) => {
  initializeApp(loginStatus);
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
