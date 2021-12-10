import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	PAYMENT_REQUEST,
	PAYMENT_SUCCESS,
	PAYMENT_FAIL,
} from '../constants/userConstants.js';
import authenApi from '../../api/authenApi';
import userApi from '../../api/userApi';

export const loginAction = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST,
		});

		const res = await authenApi.login(email, password);

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: res.data,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: USER_LOGIN_FAIL,
			payload: error,
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

			const res = await authenApi.register(dataSend);

			dispatch({
				type: USER_REGISTER_SUCCESS,
				payload: res.data,
			});
		} catch (error) {
			dispatch({
				type: USER_REGISTER_FAIL,
				payload: error,
			});
		}
	};

export const payment = (query) => async (dispatch) => {
	try {
		dispatch({
			type: PAYMENT_REQUEST,
		});

		const res = await userApi.payment(query);

		dispatch({
			type: PAYMENT_SUCCESS,
			payload: res.data,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: PAYMENT_FAIL,
			payload: error,
		});
	}
};
