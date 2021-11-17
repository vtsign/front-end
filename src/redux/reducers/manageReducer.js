import { DOCUMENT_GET_PAGE_REQUEST,
    DOCUMENT_GET_PAGE_SUCCESS,
    DOCUMENT_GET_PAGE_FAIL
} from "../constants/manageConstants"

const stateInitials = {
	isLoading: false,
	total_pages: 0,
	current_page: 0,
	total_items: 0,
	contracts: [],
	error: null
}
    
export const manageDocumentReducer = (state = stateInitials, action) => {
	switch (action.type) {
		case DOCUMENT_GET_PAGE_REQUEST:
			return { ...state, isLoading: true, contracts:[] };
		case DOCUMENT_GET_PAGE_SUCCESS:
			const {total_pages, current_page, total_items, contracts} = action.payload;
			return { ...state, isLoading: false, total_pages, current_page, total_items, contracts };
		case DOCUMENT_GET_PAGE_FAIL:
			return { error: action.payload };
		default:
			return state;
	};
}