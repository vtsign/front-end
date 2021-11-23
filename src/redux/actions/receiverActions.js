import {
	ADD_RECEIVERS,
	RESET_RECEIVERS,
	REMOVE_RECEIVER
} from '../constants/receiverConstants';

export const addReceiver = receiver => {
	return {
		type: ADD_RECEIVERS,
		payload: receiver
	}
}

export const removeReceiver = (receiverIndex) => {
	return {
		type: REMOVE_RECEIVER,
		payload: receiverIndex ,
	};
}
