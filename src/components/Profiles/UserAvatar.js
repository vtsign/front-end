import React from 'react'
import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	Typography,
} from '@mui/material';

const UserAvatar = ({ userInfo }) => {
	return (
		<Card>
			<CardContent>
				<Box
					sx={{
						alignItems: 'center',
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<Avatar
						// src={user.avatar}
						sx={{
							height: 64,
							mb: 2,
							width: 64,
						}}
					/>
					<Typography color="textPrimary" gutterBottom variant="h5">
						{userInfo.first_name} {userInfo.last_name}
					</Typography>
					<Typography color="textSecondary" variant="body2">
						{userInfo.email}
					</Typography>
				</Box>
			</CardContent>
			<Divider />
			<CardActions>
				<Button color="primary" fullWidth variant="text">
					Thay đổi hình đại diện
				</Button>
			</CardActions>
		</Card>
	);
}

export default UserAvatar;
