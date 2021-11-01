import axios from 'axios';
import {
	ADD_DOCUMENT_TO_SIGN,
	ADD_DOCUMENT_TO_SIGN_FAIL,
	UPDATE_DOCUMENT_TO_SIGN,
	UPDATE_DOCUMENT_TO_SIGN_FAIL,
} from '../constants/documentConstants.js';
import { mergeAnnotations } from '../../components/MergeAnnotations/MergeAnnotations.js';

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

export const updateDocumentToSign = (json, file, xfdf) => async (dispatch) => {
	try {
		// TODO: Get file data

		// const doc = await axios.get('')
		// const { signedBy, emails, xfdf, docRef } = doc;

		// const signedByArray = [...signedBy, email];
		// const xfdfArray = [...xfdf, xfdfSigned];
		// Update xfdf array

		// if (signedByArray.length === emails.length) {
		// 	const time = new Date();
		// 	// Update whether document is signed and signed at?

		// 	mergeAnnotations(docRef, xfdfArray);
		// }

		const formData = new FormData();
		formData.append('data', JSON.stringify(json));
		formData.append('files', file);
		// formData.append("files", file);
		const header = {
			'content-type': 'application/octet-stream',
		};

		const { data } = await axios.post(
			'https://api.vtsign.tech/document/signing',
			formData,
			header
		);

		dispatch({
			type: UPDATE_DOCUMENT_TO_SIGN,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: UPDATE_DOCUMENT_TO_SIGN_FAIL,
			payload: error.response.data,
		});
	}
}
