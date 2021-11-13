import {
	SAVE_WEBVIEWER_INSTANCE
} from '../constants/webviewerConstants';

export const saveWebviewerInstance = (instance) => async (dispatch) => {
	await dispatch({
		type: SAVE_WEBVIEWER_INSTANCE,
		payload: instance
	});
}
