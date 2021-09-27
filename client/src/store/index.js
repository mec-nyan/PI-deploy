import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducer/index.js';
import thunk from 'redux-thunk';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
