import { combineReducers } from 'redux';
import mobilesReducer from './mobilesReducer';

const rootReducer = combineReducers({
  mobiles: mobilesReducer,
});

export default rootReducer;
