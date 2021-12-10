import React from 'react';
import { Avatar, AvatarContainer, AvatarLabel, Typography } from '@mui/material';

import { Edit, MenuBook } from '@mui/icons-material';
import './ReceiverAvatar.scss';
import { useDispatch } from 'react-redux';
import { removeReceiver } from '../../redux/actions/receiverActions'

const ReceiverAvatar = ({ receiver, hideButton=false, index }) => {
	const dispatch = useDispatch();

	const handleDeleteReceiver = () => {
		dispatch(removeReceiver(index));
	}

	return (
		<div className="receiver">
			<div>
				<Avatar className="receiver__avatar" size={48} gap={1}>
					{receiver.permission === "sign" ? <Edit /> : <MenuBook />}
				</Avatar>
			</div>
			<div className="receiver__info">
				<span className="receiver__name">{receiver.name}</span>
				<span className="receiver__email">{receiver.email}</span>
			</div>
			{hideButton === false && (
				<div
					role="button"
					tabIndex="0"
					className="receiver__delete-btn"
					data-id={index}
					onClick={handleDeleteReceiver}
				>
					Xóa
				</div>
			)}
		</div>
	);
}

export default ReceiverAvatar
