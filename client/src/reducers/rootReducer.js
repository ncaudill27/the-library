import { combineReducers } from 'redux';
import clubsReducer from './clubsReducer';

const rootReducer = combineReducers({
  clubs: clubsReducer
})

export default rootReducer;