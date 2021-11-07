import React, { useState, useRef, useEffect } from 'react';
import {
	Avatar,
	Box,
	Button,
	Card,
	CardContent,
	Checkbox,
	Container,
	FormControlLabel,
	Grid,
	InputLabel,
	Step,
	StepLabel,
	Stepper,
	TextField,
	Stack,
	IconButton,
	Divider,
	Typography,
	FormControl,
	Select,
	MenuItem,
} from '@mui/material';
import {
	CloudUpload,
	InsertDriveFile,
	BorderColor,
	CalendarToday,
	TextFields,
	PersonOutline,
	MailOutline,
	Computer,
	Brush,
} from '@mui/icons-material';
import { Controller, useForm, useController } from 'react-hook-form';
import WebViewer from '@pdftron/webviewer';
import ReceiverAvatar from '../../ReceiverAvatar/ReceiverAvatar';


const SendFiles = () => {

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const receiver = {
		name: 'abc',
		email: 'abc@gmail.com'
	}

	return (
		<>
			<Grid>
				<Typography variant="h6" my="1rem">
					Kiểm tra và gửi file
				</Typography>
			</Grid>
			<Grid display="flex" my="1rem">
				<Grid item lg={8} md={12} xl={7} xs={12} mr="2rem">
					<Card>
						<CardContent>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									minHeight: '60vh',
									color: '#2F80ED',
									cursor: 'pointer',
									margin: '0 2rem',
								}}
							>
								<Grid
									display="flex"
									justifyContent="space-between"
									alignItems="center"
									my="1rem"
								>
									<InputLabel>Chủ đề Email</InputLabel>
									<TextField
										id="title"
										placeholder="Nguyễn Văn A"
										sx={{ minWidth: '25vw' }}
										{...register('title', {
											required: 'Vui lòng nhập chủ đề Email',
										})}
										error={!!errors.title}
										helperText={errors?.title?.message}
									/>
								</Grid>
								<Grid
									display="flex"
									justifyContent="space-between"
									alignItems="center"
									my="1rem"
								>
									<InputLabel>Thông điệp Email</InputLabel>
									<TextField
										id="message"
										placeholder="Thông điệp"
										sx={{ minWidth: '25vw' }}
										{...register('message', {
											required: 'Vui lòng nhập thông điệp Email',
										})}
										error={!!errors.message}
										helperText={errors?.message?.message}
									/>
								</Grid>
							</Box>
						</CardContent>
					</Card>
				</Grid>
				<Grid item lg={4} md={6} xl={5} xs={12}>
					<Card>
						<CardContent>
							<ReceiverAvatar receiver />
							{/* {receivers.length > 0 ? (
								receivers.map((partner, index) => (
									<ReceiverAvatar receiver={partner} />
								))
							) : (
								<div
									style={{
										height: '400px',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									<span>Chưa chọn có người nhận</span>
								</div>
							)} */}
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</>
	);
};

export default SendFiles;
