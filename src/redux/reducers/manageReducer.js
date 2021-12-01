import {
	DOCUMENT_GET_PAGE_REQUEST,
	DOCUMENT_GET_PAGE_SUCCESS,
	DOCUMENT_GET_PAGE_FAIL,
	GET_DOCUMENT_FAIL,
	GET_DOCUMENT_SUCCESS,
	GET_DOCUMENT_REQUEST,
} from '../constants/manageConstants';

const stateDocumentsInitials = {
	isLoading: false,
	total_pages: 0,
	current_page: 0,
	total_items: 0,
	contracts: [],
	error: null,
};

export const manageDocumentReducer = (state = stateDocumentsInitials, action) => {
	switch (action.type) {
		case DOCUMENT_GET_PAGE_REQUEST:
			return { ...state, isLoading: true, contracts: [] };
		case DOCUMENT_GET_PAGE_SUCCESS:
			const { total_pages, current_page, total_items, contracts } = action.payload;
			return {
				...state,
				isLoading: false,
				total_pages,
				current_page,
				total_items,
				contracts,
			};
		case DOCUMENT_GET_PAGE_FAIL:
			return {  ...state, error: action.payload };
		default:
			return state;
	}
};

const stateDocumentsDetailInitials = {
	isLoading: false,
	contract: null,
	error: null,
};

export const manageDocumentDetailReducer = (state = stateDocumentsDetailInitials, action) => {
	switch (action.type) {
		case GET_DOCUMENT_REQUEST:
			return { isLoading: true };
		case GET_DOCUMENT_SUCCESS:
			return {
				isLoading: false,
				contract: action.payload,
			};
		case GET_DOCUMENT_FAIL:
			return { error: action.payload };
		default:
			return state;
	}
};
