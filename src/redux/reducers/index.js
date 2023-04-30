import { combineReducers } from 'redux';
import { player } from './player';
import { config } from './config';

const rootReducer = combineReducers({ player, config });

export default rootReducer;
