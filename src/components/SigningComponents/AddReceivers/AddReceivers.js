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
import ReceiverAvatar from '../../ReceiverAvatar/ReceiverAvatar';
import './AddReceivers.scss'

const AddReceivers = () => {
	const [receivers, setReceivers] = useState([]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const addReceivers = (formData) => {
		setReceivers((receivers) => [...receivers, formData]);
		console.log(receivers);
	};

	return (
		<Container maxWidth={false} style={{ height: '100%' }}>
			<Grid>
				<Typography variant="h6" my="1rem">
					Thông tin người nhận
				</Typography>
			</Grid>
			<Grid container my="1rem" style={{ height: '100%' }}>
				<Grid item lg={8} md={12} xl={8} xs={12}>
					<Box className="add-receivers__container">
						<Grid
							display="flex"
							justifyContent="space-between"
							alignItems="center"
							my="1rem"
						>
							<InputLabel>Tên người nhận</InputLabel>
							<TextField
								id="name"
								placeholder="Nguyễn Văn A"
								sx={{ minWidth: '25vw' }}
								{...register('name', {
									required: 'Vui lòng nhập họ và tên người nhận',
								})}
								error={!!errors.name}
								helperText={errors?.name?.message}
							/>
						</Grid>
						<Grid
							display="flex"
							justifyContent="space-between"
							alignItems="center"
							my="1rem"
						>
							<InputLabel>Địa chỉ Email</InputLabel>
							<TextField
								id="email"
								placeholder="Nguyễn Văn A"
								sx={{ minWidth: '25vw' }}
								{...register('email', {
									required: 'Vui lòng nhập địa chỉ Email',
								})}
								error={!!errors.email}
								helperText={errors?.email?.message}
							/>
						</Grid>
						<Grid
							display="flex"
							justifyContent="space-between"
							alignItems="center"
							my="1rem"
						>
							<InputLabel>Quyền hạn</InputLabel>
							<TextField
								id="permission"
								placeholder="Nguyễn Văn A"
								sx={{ minWidth: '25vw' }}
								{...register('permission', {
									required: 'Lựa chọn quyền hạn',
								})}
								error={!!errors.permission}
								helperText={errors?.permission?.message}
							/>
						</Grid>
						<Grid
							display="flex"
							justifyContent="space-between"
							alignItems="center"
							my="1rem"
						>
							<InputLabel>Sử dụng khóa</InputLabel>
							<TextField
								id="key"
								placeholder="Nguyễn Văn A"
								sx={{ minWidth: '25vw' }}
								{...register('key')}
								error={!!errors.key}
								helperText={errors?.key?.message}
							/>
						</Grid>
						<Grid
							display="flex"
							justifyContent="flex-end"
							alignItems="center"
							my="1rem"
						>
							<Button variant="contained" onClick={handleSubmit(addReceivers)}>
								Tạo mới
							</Button>
						</Grid>
					</Box>
				</Grid>
				<Grid item lg={4} md={6} xl={4} xs={12}>
					<Card style={{ overflowY: 'auto' }}>
						<CardContent>
							{receivers.length > 0 ? (
								receivers.map((partner, index) => (
									<ReceiverAvatar receiver={partner} />
								))
							) : (
								<div
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										height: '100%',
									}}
								>
									<span>Chưa chọn có người nhận</span>
								</div>
							)}
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Container>
	);
};

export default AddReceivers;
