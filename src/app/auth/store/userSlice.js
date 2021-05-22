import { createSlice } from '@reduxjs/toolkit';
import history from '@history';
import authService from 'app/services/customerService/authService';

export const setUserData = user => async (dispatch, getState) => {
	dispatch(setUser(user));
};


export const logoutUser = () => async (dispatch, getState) => {
	const { user } = getState().auth;

	if (!user.role || user.role.length === 0) {
		// is guest
		return null;
	}

	history.push({
		pathname: '/'
	});

	if (user.from === 'weaverslk' ) {
		authService.logout();

	}

	return dispatch(userLoggedOut());
};



const initialState = {
	role: [], // guest
	data: {
		user: {},
		photoURL: 'assets/images/avatars/Velazquez.jpg',
		email: 'johndoe@withinpixels.com',
		shortcuts: ['calendar', 'mail', 'contacts', 'todo']
	}
};

const userSlice = createSlice({
	name: 'auth/user',
	initialState,
	reducers: {
		setUser: (state, action) => action.payload,
		userLoggedOut: (state, action) => initialState
	},
	extraReducers: {}
});

export const { setUser, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;
