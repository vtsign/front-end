import {
	SAVE_WEBVIEWER_INSTANCE
} from '../constants/webviewerConstants';

const initialState = {
	instance: null
}

export const webviewerReducer = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_WEBVIEWER_INSTANCE:
			return {
				...state,
				instance: action.payload,
			};
		default:
			return state;
	}
}
