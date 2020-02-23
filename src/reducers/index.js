import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { mailReducer } from './mailReducer';
import { progressReducer } from './progressReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  mail: mailReducer,
  progress: progressReducer,
});

export default rootReducer;