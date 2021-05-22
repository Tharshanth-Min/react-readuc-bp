import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createReducer from './rootReducer';
import {persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist'

if (process.env.NODE_ENV === 'development' && module.hot) {
	module.hot.accept('./rootReducer', () => {
		const newRootReducer = require('./rootReducer').default;
		store.replaceReducer(newRootReducer.createReducer());
	});
}

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
	const { logger } = require(`redux-logger`);

	middlewares.push(logger);
}


// const store = configureStore({
// 	reducer: createReducer(),
// 	middleware: getDefaultMiddleware({
// 		serializableCheck: {
// 			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
// 		}
// 	}),
// 	devTools: process.env.NODE_ENV === 'development'
// });

const store = configureStore({
	reducer: createReducer(),
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			immutableCheck: false,
			serializableCheck: {

			}
		}).concat(middlewares),
	devTools: process.env.NODE_ENV === 'development'
});

store.asyncReducers = {};

export const injectReducer = (key, reducer) => {
	if (store.asyncReducers[key]) {
		return false;
	}
	store.asyncReducers[key] = reducer;
	store.replaceReducer(createReducer(store.asyncReducers));
	return store;
};

export const persist = persistStore( store );

export default store;

