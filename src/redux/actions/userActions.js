import axios from 'axios';
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_ACTIVATION_REQUEST,
	USER_ACTIVATION_SUCCESS,
	USER_ACTIVATION_FAIL,
} from '../constants/userConstants.js';
import authenApi from '../../api/authenApi';

export const loginAction = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST,
		});

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const data = await axios.post(
			'https://api.vtsign.tech/auth/login',
			{
				email,
				password,
			},
			config
		);

		localStorage.setItem("accessToken", data.data.access_token);
		localStorage.setItem("refreshToken", data.data.refresh_token);
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data.data,
		});
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload: error.response.data,
		});
	}
};

export const registerAction =
	(email, password, phone, organization, address, first_name, last_name) => async (dispatch) => {
		try {
			dispatch({
				type: USER_REGISTER_REQUEST,
			});

			const dataSend = {
				email,
				password,
				phone,
				organization,
				address,
				first_name,
				last_name,
			};

			const { data } = await authenApi.register('/auth/register', dataSend);

			console.log(DataTransferItem);

			dispatch({
				type: USER_REGISTER_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: USER_REGISTER_FAIL,
				payload: error.response.data,
			});
		}
	};
