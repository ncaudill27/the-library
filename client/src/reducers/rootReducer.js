import { combineReducers } from 'redux';
import clubsReducer from './clubsReducer';
import usersReducer from './userReducer';

const rootReducer = combineReducers({
  clubs: clubsReducer,
  users: usersReducer
})

export default rootReducer;