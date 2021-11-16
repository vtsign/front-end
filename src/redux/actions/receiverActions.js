import {
	ADD_RECEIVERS
} from '../constants/receiverConstants';

export const addReceiver = receiver => {
	return {
		type: ADD_RECEIVERS,
		payload: receiver
	}
}
