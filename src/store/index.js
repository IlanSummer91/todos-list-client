import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import todosReducer from './todosReducer'

const rootReducer = combineReducers({
  todosReducer
});

const middleWares = applyMiddleware(thunk);

export default createStore(rootReducer, middleWares);