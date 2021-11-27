import { ADD_RECEIVERS, RESET_RECEIVERS, REMOVE_RECEIVER } from '../constants/receiverConstants';

const initialState = {
	receivers: [],
};

export const receiverReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_RECEIVERS:
			return {
				...state,
				receivers: state.receivers.concat(action.payload),
			};
		case RESET_RECEIVERS:
			return {
				...state,
				receivers: [],
			};
		case REMOVE_RECEIVER:
			const currentListPartner = [...state.receivers];
			currentListPartner.splice(action.payload, 1);
			// const result = state.receivers.splice(action.payload, 1);
			return {
				...state,
				receivers: [...currentListPartner],
			};
		default:
			return state;
	}
};
