import {
	ADD_DOC_LIST,
	ADD_DOCUMENT_TO_SIGN,
	ADD_DOCUMENT_TO_SIGN_FAIL,
	UPDATE_DOCUMENT_TO_SIGN,
	UPDATE_DOCUMENT_TO_SIGN_FAIL,
	RESET_DOC_LIST,
	SHOW_LOADING,
} from '../constants/documentConstants.js';

const initialState = {
	documentList: [],
	loading: false,
};

export const addDocListReducer = (state = initialState, action) => {
	const payload = action.payload;
	switch (action.type) {
		case ADD_DOC_LIST:
			return {
				...state,
				documentList: state.documentList.concat(action.payload),
			};
		case RESET_DOC_LIST:
			return {
				...state,
				documentList: [],
			};
		case SHOW_LOADING:
			return {
				...state,
				SHOW_LOADING: payload,
			};
		default:
			return state;
	}
};

export const editDocReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_DOCUMENT_TO_SIGN:
			return { document: action.payload };
		case ADD_DOCUMENT_TO_SIGN_FAIL:
			return { error: action.payload };
		case UPDATE_DOCUMENT_TO_SIGN:
			return { document: action.payload };
		case UPDATE_DOCUMENT_TO_SIGN_FAIL:
			return { error: action.payload };
		default:
			return state;
	}
};
