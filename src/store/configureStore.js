import { createStore, combineReducers } from 'redux';

import rootReducer from './reducers/rootReducer';


const reducers = combineReducers({
  expense: rootReducer
});

const configureStore = () => {
  return createStore(reducers);
};

export default configureStore;
