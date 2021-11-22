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
import './AddReceivers.scss';
import randomstring from "randomstring";
import { useDispatch } from 'react-redux';
import { addReceiver } from '../../../redux/actions/receiverActions.js';
import userApi from '../../../api/userApi'

const permissions = ["Chỉ ký", "Chỉ đọc"];

const AddReceivers = ({ register, handleSubmit, errors, control, setValue }) => {
	const [receivers, setReceivers] = useState([]);
	const [showPhone, setShowPhone] = useState(false);
	// const {
	// 	register,
	// 	handleSubmit,
	// 	formState: { errors },
	// 	control,
	// 	setValue,
	// 	getValues
	// } = useForm();

	const dispatch = useDispatch();

	const addReceivers = (formData) => {
		dispatch(addReceiver(formData))
		setReceivers((receivers) => [...receivers, formData]);
		console.log(formData);
	};

	const handleInputEmailBlur = async (e) => {
		const email = e.target.value;
		if(email.includes('@')) {
			const userExists = await userApi.checkUserExists(email);
			setShowPhone(userExists);
		} else {
			setShowPhone(false);
		}
	}
	// useEffect(() => {
	// 	console.log(getValues())
	// }, [getValues])

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
								placeholder="nguyenvana@email.com"
								sx={{ minWidth: '25vw' }}
								{...register('email', {
									required: 'Vui lòng nhập địa chỉ Email',
								})}
								error={!!errors.email}
								helperText={errors?.email?.message}
								onBlur={handleInputEmailBlur}
							/>
						</Grid>
						{showPhone && (
							<Grid
								display="flex"
								justifyContent="space-between"
								alignItems="center"
								my="1rem"
							>
								<InputLabel>Số điện thoại</InputLabel>
								<TextField
									id="phone"
									placeholder="+84999111222"
									sx={{ minWidth: '25vw' }}
									{...register('phone')}
									error={!!errors.phone}
									helperText={errors?.phone?.message}
								/>
							</Grid>
						)}
						<Grid
							display="flex"
							justifyContent="space-between"
							alignItems="center"
							my="1rem"
						>
							<InputLabel>Quyền hạn</InputLabel>
							<Controller
								name="permission"
								control={control}
								render={({ ref, value, ...inputProps }) => (
									<TextField
										select
										fullWidth
										variant="outlined"
										size="small"
										style={{ width: '25vw' }}
										{...inputProps}
										inputRef={ref}
										value={value}
										defaultValue=""
										SelectProps={{ displayEmpty: true }}
										onChange={(e) => setValue("permission", e.target.value)}
									>
										<MenuItem value="">Lựa chọn quyền hạn</MenuItem>
										{permissions.map((permission) => (
											<MenuItem key={permission} value={permission}>
												{permission}
											</MenuItem>
										))}
									</TextField>
								)}
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
								placeholder="VTSign"
								sx={{ minWidth: '25vw' }}
								{...register('key')}
								error={!!errors.key}
								helperText={errors?.key?.message}
								value={'VT' + randomstring.generate(6)}
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
