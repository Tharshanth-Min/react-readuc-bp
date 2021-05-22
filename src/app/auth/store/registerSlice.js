import { createSlice } from '@reduxjs/toolkit';
import customerAuthService from "../../services/customerService/authService";


export const registerCustomer = (credentials) => async dispatch => {
	return customerAuthService
		.createUser(credentials)
		.then(userData => {
			dispatch(registerError(""))
			return dispatch(registerSuccess());
		})
		.catch(error => {
			return dispatch(registerError(error.errors));
		});
};

const initialState = {
	success: false,
	errors: {
		email: null,
		password: null
	}
};

const registerSlice = createSlice({
	name: 'auth/register',
	initialState,
	reducers: {
		registerSuccess: (state, action) => {
			state.success = true;
		},
		registerError: (state, action) => {
			state.success = false;
			state.error = action.payload;
		}
	},
	extraReducers: {}
});

export const { registerSuccess, registerError } = registerSlice.actions;

export default registerSlice.reducer;
