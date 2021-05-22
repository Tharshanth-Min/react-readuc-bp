import { combineReducers } from '@reduxjs/toolkit';
import auth from 'app/auth/store';
import titum from './titum';
import productReducer from "../main/store";

const createReducer = asyncReducers =>
	combineReducers({
		auth,
		titum,
		productReducer,
		...asyncReducers
	});

export default createReducer;
