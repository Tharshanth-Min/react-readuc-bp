import { combineReducers } from '@reduxjs/toolkit';
import settings from './settingsSlice';

const fuseReducers = combineReducers({
	settings,
});

export default fuseReducers;
