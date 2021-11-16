import {
	ADD_DOC_LIST,
	ADD_DOCUMENT_TO_SIGN,
	ADD_DOCUMENT_TO_SIGN_FAIL,
	UPDATE_DOCUMENT_TO_SIGN,
	UPDATE_DOCUMENT_TO_SIGN_FAIL,
} from '../constants/documentConstants.js';

const initialState = {
	documentList: []
}

export const addDocListReducer = (state = initialState, action) => {
	switch(action.type) {
		case ADD_DOC_LIST:
			return {
				...state,
				documentList: state.documentList.concat(action.payload),
			};
		default:
			return state;
	}
}

export const editDocReducer = (state = initialState , action) => {
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
