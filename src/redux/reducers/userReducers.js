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
	USER_LOGOUT,
} from '../constants/userConstants.js';

const initialState = {
	loading: false,
	user: null,
	error: null,
	isLogin: false
};

export const userLoginReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { loading: true };
		case USER_LOGIN_SUCCESS:
			return { loading: false, user: action.payload, error: null, isLogin: true };
		case USER_LOGIN_FAIL:
			return { loading: false, error: action.payload, isLogin: false };
		case USER_LOGOUT:
			localStorage.setItem("isLogin", "false");
			return { loading: false, user: null, error: null, isLogin: false };
		default:
			return state;
	}
};

export const userRegisterReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return { loading: true };
		case USER_REGISTER_SUCCESS:
			return { loading: false, user: action.payload, error: null };
		case USER_REGISTER_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};


const initialStatePayment = {
	loading: false,
	data: null,
	error: null,
};

export const paymentReducer = (state = initialStatePayment, action) => {
	switch (action.type) {
		case PAYMENT_REQUEST:
			return { loading: true };
		case PAYMENT_SUCCESS:
			return { loading: false, data: action.payload, error: null };
		case PAYMENT_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
