import axios from 'axios';
import {
	ADD_DOC_LIST,
	ADD_DOCUMENT_TO_SIGN,
	ADD_DOCUMENT_TO_SIGN_FAIL,
	UPDATE_DOCUMENT_TO_SIGN,
	UPDATE_DOCUMENT_TO_SIGN_FAIL,
} from '../constants/documentConstants.js';
import { mergeAnnotations } from '../../components/MergeAnnotations/MergeAnnotations.js';
import documentApi from "../../api/documentApi";

export const addDocumentList = documents => {
	return {
		type: ADD_DOC_LIST,
		payload: documents
	}
}

export const addDocumentToSign = (json, file) => async (dispatch) => {
	try {
		// const formData = new FormData();
		// formData.append('data', JSON.stringify(json));
		// formData.append('files', file);
		// formData.append("files", file);
		// const header = {
		// 	'content-type': 'application/octet-stream',
		// 	'authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJycmZwYi50aG90dWFuQGluYm94LnRlc3RtYWlsLmFwcCIsImp0aSI6Ijc3MGQzN2U5LTJjZDEtNDQyMS04NmM5LThjYjBjOWNiMWNlYyIsImlzcyI6Imh0dHBzOi8vdnRzaWduLnRlY2gvIiwiaWF0IjoxNjM1ODY1Njg5LCJleHAiOjE2MzU5NTIwODl9.3BtvSHIs5IDAj2sMqR9BGQDEL7rF5cl31K42rUXpNnlDQ0MPNuDMWZ-o2yGtjVlaMPp2RmLFdPbfcFMj-ofiHQ'
		// };

		// const { data } = await axios.post(
		// 	'http://167.99.73.204:8765/document/signing', formData,
		// 	{
		// 		headers: header
		// 	}
		// );
		const { data } = await documentApi.postSigning(json, file);

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
