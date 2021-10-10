import axios from 'axios'
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL
} from '../constants/userConstants.js';

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST
		});

		const { data } = await axios.post('/auth/login', {
			email, password
		});

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload: error
		})
	}
}

export const register = (email, password, phone, organization, address, first_name, last_name) => async (dispatch) => {
	try {
		dispatch({
			type: USER_REGISTER_REQUEST
		});

		const { data } = await axios.post('/auth/register', {
			email,
			password,
			phone,
			organization,
			address,
			first_name,
			last_name,
		});

		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload: error
		})
	}
}
