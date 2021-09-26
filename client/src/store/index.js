import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducer/index.js';
import { default as thunk } from 'redux-thunk';

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk))
);

export default store;
