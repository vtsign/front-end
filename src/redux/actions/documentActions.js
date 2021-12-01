import axios from 'axios';
import {
	ADD_DOC_LIST,
	ADD_DOCUMENT_TO_SIGN,
	ADD_DOCUMENT_TO_SIGN_FAIL,
	UPDATE_DOCUMENT_TO_SIGN,
	UPDATE_DOCUMENT_TO_SIGN_FAIL,
} from '../constants/documentConstants.js';
import documentApi from "../../api/documentApi";

export const addDocumentList = documents => {
	return {
		type: ADD_DOC_LIST,
		payload: documents
	}
}

export const loadDocument = () => async (dispatch) => {
	
}

export const addDocumentToSign = (json, file) => async (dispatch) => {
	try {
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
