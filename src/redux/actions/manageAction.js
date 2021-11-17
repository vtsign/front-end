import {DOCUMENT_GET_PAGE_REQUEST,
    DOCUMENT_GET_PAGE_SUCCESS,
    DOCUMENT_GET_PAGE_FAIL
} from "../constants/manageConstants"
    
import manageApi from '../../api/manageApi';

export const getAllContracts = (type, page) => async (dispatch) => {
	try {
		dispatch({
			type: DOCUMENT_GET_PAGE_REQUEST,
        });
        
        let res = {};
        switch (type) {
            case "COMPLETED":
                res = await manageApi.getContractsCompleted(page);
                break;
            default:
                res = await manageApi.getContractsWaiting(page);
                break;
        }

		dispatch({
			type: DOCUMENT_GET_PAGE_SUCCESS,
			payload: res.data,
		});
    } catch (error) {
        
        console.error(error);
		dispatch({
			type: DOCUMENT_GET_PAGE_FAIL,
			payload: error.response.data,
		});
	}
};