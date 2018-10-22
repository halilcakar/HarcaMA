import { createStore, combineReducers } from 'redux';

import rootReducer from './reducers/rootReducer';

const rootReducers = combineReducers({
  expense: rootReducer
});

const configureStore = () => {
  return createStore(rootReducers);
};

export default configureStore;
