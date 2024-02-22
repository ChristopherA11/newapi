import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk'; 
import rootReducer from '../reducers/rootReducer';

// const store = createStore(rootReducer, {}, applyMiddleware(thunk));
const store = () => createStore(rootReducer,  applyMiddleware(thunk));
// const store = () => createStore(rootReducer);
// const store = createStore(rootReducer)

export default store;
