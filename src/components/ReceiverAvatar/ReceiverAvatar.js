import React from 'react';
import { Avatar, AvatarContainer, AvatarLabel, Typography } from '@mui/material';
import './ReceiverAvatar.scss'

const ReceiverAvatar = ({ receiver }) => {
	return (
		<div className="receiver">
			<div className="avatar">
				<Avatar
					style={{
						backgroundColor: '#EB5757',
						verticalAlign: 'middle',
						cursor: 'pointer',
					}}
					size={48}
					gap={1}
				>
					B
				</Avatar>
			</div>
			<div className="receiver__info">
				<h5 className="receiver__name">{receiver.receiver}</h5>
				<p className="receiver__email">{receiver.email}</p>
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
