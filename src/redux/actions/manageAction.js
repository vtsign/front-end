import {
	DOCUMENT_GET_PAGE_REQUEST,
	DOCUMENT_GET_PAGE_SUCCESS,
	DOCUMENT_GET_PAGE_FAIL,
	GET_DOCUMENT_SUCCESS,
	GET_DOCUMENT_REQUEST,
	GET_DOCUMENT_FAIL,
} from '../constants/manageConstants';

import manageApi from '../../api/manageApi';

export const getAllContracts = (query) => async (dispatch) => {
	try {
		dispatch({
			type: DOCUMENT_GET_PAGE_REQUEST,
		});

		let res = await manageApi.getContracts(query);

		dispatch({
			type: DOCUMENT_GET_PAGE_SUCCESS,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: DOCUMENT_GET_PAGE_FAIL,
			payload: error.response,
		});
	}
};

export const getContractById = (id) => async (dispatch) => {
	try {
		dispatch({
			type: GET_DOCUMENT_REQUEST,
		});

		const res = await manageApi.getContractById(id);

		dispatch({
			type: GET_DOCUMENT_SUCCESS,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: GET_DOCUMENT_FAIL,
			payload: error.response,
		});
	}
};
