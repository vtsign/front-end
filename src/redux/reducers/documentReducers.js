import {
	ADD_DOCUMENT_TO_SIGN,
	ADD_DOCUMENT_TO_SIGN_FAIL,
	UPDATE_DOCUMENT_TO_SIGN,
	UPDATE_DOCUMENT_TO_SIGN_FAIL,
} from '../constants/documentConstants.js';

export const editDocReducer = (state , action) => {
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
}
