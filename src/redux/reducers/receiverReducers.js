import { ADD_RECEIVERS } from '../constants/receiverConstants';

const initialState = {
	receivers: []
}

export const receiverReducer = (state = initialState, action) => {
	switch(action.type) {
		case ADD_RECEIVERS:
			return {
				...state,
				receivers: state.receivers.concat(action.payload),
			};
		default:
			return state;
	}
}
