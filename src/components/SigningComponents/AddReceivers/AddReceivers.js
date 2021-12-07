import React, { useState, useEffect } from 'react';
import {
	Box,
	Button,
	Card,
	CardContent,
	Container,
	Grid,
	InputLabel,
	MenuItem,
	TextField,
	Typography,
} from '@mui/material';
import './AddReceivers.scss';
import { REG_EMAIL, REG_PHONE } from '../../constants/global.js';
import { useToast } from '../../toast/useToast.js';
import randomstring from 'randomstring';
import { Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import userApi from '../../../api/userApi';
import { addReceiver } from '../../../redux/actions/receiverActions.js';
import ReceiverAvatar from '../../ReceiverAvatar/ReceiverAvatar';

const permissions = [
	{
		label: 'Đọc và ký',
		value: 'sign',
	},
	{
		label: 'Chỉ đọc',
		value: 'read',
	},
];

const defaultValues = {

	name: '',
	email: '',
	phone: '',
	permission: 'sign',
};

const AddReceivers = ({ register, handleSubmit, errors, control, getValues, setValue, reset, watch }) => {
	// const [receivers, setReceivers] = useState([]);
	const [showPhone, setShowPhone] = useState(false);
	const [email, setEmail] = useState('');
	const dispatch = useDispatch();
	const receivers = useSelector((state) => state.receivers.receivers);
	const { error } = useToast();

	const myInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;


	const addReceivers = (formData) => {
		if(formData.email === myInfo.email) {
			error('Không được tự gửi đến chính mình');
			return;
		}
		const receiverEmails = receivers.map((receiver) => {
			return receiver.email;
		});
		if (receiverEmails.includes(formData.email)) {
			error('Người nhận đã tồn tại');
			return;
		}
		if (!showPhone) {
			formData.phone = null;
		}
		setShowPhone(false);
		dispatch(addReceiver(formData));
		reset(defaultValues);
	};

	useEffect(() => {
		if (email) {
			const timer = setTimeout(async () => {
				if (REG_EMAIL.test(email)) {
					const userExists = await userApi.checkUserExists(email);
					setShowPhone(!userExists.data);
				} else {
					setShowPhone(false);
				}
			}, 300);
			return () => {
				clearTimeout(timer);
			};
		} else {
			setShowPhone(false);
		}
	}, [email]);

	return (
		<Container maxWidth={false}>
			<Grid>
				<Typography variant="h6" my="1rem">
					Thông tin người nhận
				</Typography>
			</Grid>
			<Grid container>
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
									pattern: {
										value: REG_EMAIL,
										message: 'Email sai định dạng',
									},
								})}
								error={!!errors.email}
								helperText={errors?.email?.message}
								onChange={(e) => setEmail(e.target.value)}
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
									{...register('phone', {
										required: 'Vui lòng nhập SĐT',
										pattern: {
											value: REG_PHONE,
											message: 'SĐT sai định dạng',
										},
									})}
									error={!!errors.phone}
									// helperText={errors?.phone?.message}
									helperText="Người nhận chưa có tài khoản hệ thống cần nhập SĐT"
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
										value={getValues('permission')}
										defaultValue={getValues('permission')}
										// SelectProps={{ displayEmpty: true }}
										onChange={(e) => setValue('permission', e.target.value)}
									>
										{/* <MenuItem value="">Lựa chọn quyền hạn</MenuItem> */}
										{permissions.map((permission) => (
											<MenuItem
												key={permission.value}
												value={permission.value}
												// selected={
												// 	watch('permission') ===
												// 	permission.value
												// }
											>
												{permission.label}
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
								placeholder="Khóa sẽ gửi qua SĐT người nhận"
								sx={{ minWidth: '25vw' }}
								{...register('key')}
								error={!!errors.key}
								helperText={errors?.key?.message}
								defaultValue={'VT' + randomstring.generate(6)}
							/>
						</Grid>
						<Grid
							display="flex"
							justifyContent="space-between"
							alignItems="center"
							my="1rem"
						>
							<InputLabel>Tin nhắn riêng tư</InputLabel>
							<TextField
								id="private_message"
								sx={{ minWidth: '25vw' }}
								rows={5}
								rowsMax={10}
								{...register('private_message')}
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
					<Card className="receiver__list">
						<CardContent>
							{receivers.length > 0 ? (
								receivers.map((partner, index) => (
									<ReceiverAvatar receiver={partner} index={index} />
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
