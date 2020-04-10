import { combineReducers } from 'redux';
import clubsReducer from './clubsReducer';
import usersReducer from './userReducer';
import threadsReducer from './threadsReducer';

const rootReducer = combineReducers({
  clubs: clubsReducer,
  users: usersReducer,
  threads: threadsReducer
});

export default rootReducer;