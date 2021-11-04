import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_LOGOUT,
} from '../constants/userConstants.js';

const initialState = {
	loading: false,
	userInfo: null,
	error: null,
	isLogin: false
};

export const userLoginReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { loading: true };
		case USER_LOGIN_SUCCESS:
			return { loading: false, userInfo: action.payload, error: null, isLogin: true };
		case USER_LOGIN_FAIL:
			return { loading: false, error: action.payload };
		case USER_LOGOUT:
			return {loading: false, userInfo: null, error: null, isLogin: false };
		default:
			return state;
	}
};

export const userRegisterReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return { loading: true };
		case USER_REGISTER_SUCCESS:
			return { loading: false, userInfo: action.payload, error: null };
		case USER_REGISTER_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
