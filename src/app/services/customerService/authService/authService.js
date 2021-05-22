import FuseUtils from '@titum/utils/TitumUtils';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
/* eslint-disable camelcase */

const API_URL = process.env.REACT_APP_API_URL;

class AuthService extends FuseUtils.EventEmitter {
	init() {
		this.setInterceptors();
		this.handleAuthentication();
	}

	setInterceptors = () => {
		axios.interceptors.response.use(
			response => {
				return response;
			},
			err => {
				return new Promise((resolve, reject) => {
					if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
						// if you ever get an unauthorized response, logout the user
						this.emit('onAutoLogout', 'Invalid access_token');
						this.setSession(null);
					}
					throw err;
				});
			}
		);
	};

	handleAuthentication = () => {
		const access_token = this.getAccessToken();

		if (!access_token) {
			this.emit('onNoAccessToken');

			return;
		}

		if (this.isAuthTokenValid(access_token)) {
			this.setSession(access_token);
			this.emit('onAutoLogin', true);
		} else {
			this.setSession(null);
			this.emit('onAutoLogout', 'access_token expired');
		}
	};

	signInWithEmailAndPassword = (email, password) => {
		return new Promise((resolve, reject) => {
			axios
				.post(`${API_URL}/customer/login`, {
					email, password,
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json',
					}
				})
				.then(response => {
					this.setSession(response.data.access_token);
					resolve(response.data);
				})
				.catch((error) => {
					const { status, errors } = error.response.data;
					const data = { status, errors};
					reject(data);
				});
		});
	};

	signInWithToken = () => {
		return new Promise((resolve, reject) => {
			axios
				.get(`${API_URL}/customer/sign-in-with-token`, {
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json',
						'Authorization' : 'Bearer ' + this.getAccessToken(),
					}
				})
				.then(response => {
					if (response.data.user) {
						this.setSession(response.data.access_token);
						resolve(response.data);
					} else {
						this.logout();
						reject(new Error('Failed to login with authPassport.'));
					}
				})
				.catch(error => {
					this.logout();
					reject(new Error('Failed to login with authPassport.'));
				});
		});
	};

	updateUserData = user => {
		return axios.post('/api/auth/user/update', {
			user
		});
	};

	setSession = access_token => {
		if (access_token) {
			localStorage.setItem('weavers_website_access_token', access_token);
			axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
		} else {
			localStorage.removeItem('weavers_website_access_token');
			delete axios.defaults.headers.common.Authorization;
		}
	};

	logout = () => {
		this.setSession(null);
	};

	isAuthTokenValid = access_token => {
		if (!access_token) {
			return false;
		}
		const decoded = jwtDecode(access_token);
		const currentTime = Date.now() / 1000;
		if (decoded.exp < currentTime) {
			// console.warn('access token expired');
			return false;
		}

		return true;
	};

	getAccessToken = () => {
		return window.localStorage.getItem('weavers_website_access_token');
	};


	createUser = data => {
		return new Promise((resolve, reject) => {
			axios.post(`${API_URL}/customer/register`, {
				email : data.email,
				password : data.password,
				first_name : data.firstName,
				last_name : data.lastName,
			}).then(response => {
				resolve(response.data);
			}).catch((error) => {
				const { status } = error.response.data;
				const { errorss } = error.response.data;

				const errors = {
					status: status,
					errors: errorss.email ? errorss.email : errorss ? errorss : 'Something went wrong'
				}
				reject(errors)
			});
		});
	};
}

const instance = new AuthService();

export default instance;
