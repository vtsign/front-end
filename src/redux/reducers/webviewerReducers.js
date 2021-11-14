import {
	SAVE_WEBVIEWER_INSTANCE,
	SET_CURRENT_DOCUMENT,
	SET_DROP_POINT
} from '../constants/webviewerConstants';

const initialState = {
	instance: null,
	currentDocument: 0,
	dropPoint: null,
};

export const webviewerReducer = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_WEBVIEWER_INSTANCE:
			return {
				...state,
				instance: action.payload,
			};
		case SET_CURRENT_DOCUMENT:
			return {
				...state,
				currentDocument: action.payload
			}
		case SET_DROP_POINT:
			return {
				...state,
				dropPoint: action.payload
			}
		default:
			return state;
	}
}
