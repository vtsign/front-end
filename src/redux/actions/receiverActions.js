import {
	ADD_RECEIVERS,
	RESET_RECEIVERS,
	REMOVE_RECEIVER,
	UPDATE_PRIVATE_MESSAGE
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

export const updatePrivateMessage = (private_message, index) => {
	// console.log('object')
	return {
		type: UPDATE_PRIVATE_MESSAGE,
		payload: {
			private_message,
			index
		}
	}
}
