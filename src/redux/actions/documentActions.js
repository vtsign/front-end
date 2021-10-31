import axios from 'axios';
import { ADD_DOCUMENT_TO_SIGN, ADD_DOCUMENT_TO_SIGN_FAIL } from '../constants/documentConstants.js';

export const addDocumentToSign = (json, file) => async (dispatch) => {
	try {
		const formData = new FormData();
		formData.append('data', JSON.stringify(json));
		formData.append('files', file);
		// formData.append("files", file);
		const header = {
			'content-type': 'application/octet-stream',
		};

		const { data } = await axios.post(
			'https://api.vtsign.tech/document/signing', formData,
			header
		);

		dispatch({
			type: ADD_DOCUMENT_TO_SIGN,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ADD_DOCUMENT_TO_SIGN_FAIL,
			payload: error.response.data,
		});
	}
}
