import { createSlice} from '@reduxjs/toolkit';
import _ from '@lodash';

const initialSettings = {};
const initialThemes = {};

const initialState = {
	initial: initialSettings,
	defaults: _.merge({}, initialSettings),
	current: _.merge({}, initialSettings),
	themes: initialThemes
};

const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setSettings: (state, action) => {
			const current = action.payload
			return {
				...state,
				current
			};
		},
		setDefaultSettings: (state, action) => {
			const current = action.payload
			return {
				...state,
				current
			};
		},
		setInitialSettings:  (state, action) => {
			return _.merge({}, initialState);
		},
		resetSettings: (state, action) => {
			return {
				...state,
			}
		}
	}
});

export const { resetSettings, setSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
