import React from 'react';
import { Avatar, AvatarContainer, AvatarLabel, Typography } from '@mui/material';
import './ReceiverAvatar.scss'

const ReceiverAvatar = ({ receiver }) => {
	return (
		<div className="receiver">
			<div>
				<Avatar
					className="receiver__avatar"
					size={48}
					gap={1}
				>
					B
				</Avatar>
			</div>
			<div className="receiver__info">
				<span className="receiver__name">{receiver.receiver}</span>
				<span className="receiver__email">{receiver.email}</span>
			</div>
			<div
				role="button"
				tabIndex="0"
				className="receiver__delete-btn"
				// onClick={handleDeletePartner}
			>
				Xóa
			</div>
		</div>
	);
}

export default ReceiverAvatar
