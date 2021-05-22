import TitumLandingOverlay from "@titum/core/TitumLandingOverlay";
import customerAuthService from 'app/services/customerService/authService';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import {setUserData, logoutUser } from './store/userSlice';

class Auth extends Component {

	state = {
		waitAuthCheck: true,
	};

	componentDidMount() {
		return Promise.all([
			this.authCustomerCheck(),
		]).then(() => {
			this.setState({ waitAuthCheck: false });
		});
	}



	authCustomerCheck = () =>
		new Promise(resolve => {
				customerAuthService.on('onAutoLogin', () => {
				//this.props.showMessage({ message: 'Logging in as Admin' });

				/**
				 * Sign in and retrieve user data from Api
				 */
				customerAuthService
					.signInWithToken()
					.then(res => {
						const user = {
							role: ['customer'],
							from : 'weaverslk',
							data: {
								user: res.user,
								photoURL: 'assets/images/avatars/Velazquez.jpg',
								email: 'johndoe@withinpixels.com',
								shortcuts: ['calendar', 'mail']
							},
							settings : {}
						};
						this.props.setUserData(user);

						resolve();
						//this.props.showMessage({ message: 'Logged in as Admin' });
					})
					.catch(error => {
						//this.props.showMessage({ message: error.message });

						resolve();
					});
			});

				customerAuthService.on('onAutoLogout', message => {
				if (message) {
					//this.props.showMessage({ message });
				}

				this.props.logout();

				resolve();
			});

				customerAuthService.on('onNoAccessToken', () => {
				resolve();
			});

				customerAuthService.init();

			return Promise.resolve();
		}
		);

	render() {
		return this.state.waitAuthCheck ? <TitumLandingOverlay /> : <>{this.props.children}</>;
	}
}

const mapStateToProps = state => ({
	user : state.auth.user,
});

function mapDispatchToProps(dispatch) {

	return bindActionCreators(
		{
			logout: logoutUser,
			setUserData,
		},
		dispatch
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
