import { createSlice } from '@reduxjs/toolkit';
import customerAuthService from 'app/services/customerService/authService';
import { setUserData } from './userSlice';

export const submitCustomerLogin = ({ email, password }) => async dispatch => {
	return customerAuthService
		.signInWithEmailAndPassword(email, password)
		.then(res => {
			const user = {
				role: ['customer'],
				from : 'weaverslk',
				data: {
					user: res.user,
					photoURL: 'assets/images/avatars/Velazquez.jpg',
					email: 'johndoe@withinpixels.com',
				},
				settings : {}
			};
			dispatch(setUserData(user));
			dispatch(loginError(""))
			return dispatch(loginSuccess());
		})
		.catch(error => {
			return dispatch(loginError(error.errors));
		});
};

const initialState = {
	success: false,
	errors: {
		username: null,
		password: null
	}
};

const loginSlice = createSlice({
	name: 'auth/login',
	initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.success = true;
		},
		loginError: (state, action) => {
			state.success = false;
			state.error = action.payload;
		}
	},
	extraReducers: {}
});

export const { loginSuccess, loginError } = loginSlice.actions;

export default loginSlice.reducer;
