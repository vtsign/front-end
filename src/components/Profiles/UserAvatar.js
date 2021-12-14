import React, { useState, useRef } from 'react'
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

const UserAvatar = ({ userInfo, selectedImage, setSelectedImage }) => {
	const filePicker = useRef(null);

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
					{selectedImage ? (
						<Avatar
							src={URL.createObjectURL(selectedImage)}
							sx={{
								height: 128,
								mb: 2,
								width: 128,
							}}
						/>
					) : (
						<Avatar
							src={userInfo.avatar}
							sx={{
								height: 128,
								mb: 2,
								width: 128,
							}}
						/>
					)}
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
				<Button
					color="primary"
					fullWidth
					variant="text"
					onClick={() => {
						if (filePicker) {
							filePicker.current.click();
						}
					}}
				>
					Thay đổi hình đại diện
					<input
						accept="image/*"
						style={{ display: 'none' }}
						type="file"
						ref={filePicker}
						name="avatar"
						onChange={(event) => setSelectedImage(event.target.files[0])}
					/>
				</Button>
			</CardActions>
		</Card>
	);
}

export default UserAvatar;
