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
	Stack,
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
	private_message: '',
};

const AddReceivers = ({
	register,
	handleSubmit,
	errors,
	control,
	getValues,
	setValue,
	reset,
	enoughBalance,
}) => {
	// const [receivers, setReceivers] = useState([]);
	const [showPhone, setShowPhone] = useState(false);
	const [email, setEmail] = useState('');
	const dispatch = useDispatch();
	const receivers = useSelector((state) => state.receivers.receivers);
	const { error } = useToast();

	const myInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

	const addReceivers = (formData) => {
		if (formData.email.toLowerCase() === myInfo.email) {
			error('Không được tự gửi đến chính mình');
			return;
		}
		const receiverEmails = receivers.map((receiver) => {
			return receiver.email;
		});
		if (!enoughBalance) {
			error(
				`Số tiền trong tài khoản chỉ được thêm tối đa ${receiverEmails.length} người nhận, vui lòng nạp thêm tiền`
			);
			return;
		}
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
				<Grid item md={7} xs={12}>
					<Box className="add-receivers__container">
						<Grid container display={'flex'} alignItems={'center'} my=".5rem">
							<Grid item xs={12} sm={4}>
								<InputLabel>
									Tên người nhận <span style={{ color: 'red' }}>*</span>
								</InputLabel>
							</Grid>
							<Grid item xs={12} sm={8}>
								<TextField
									id="name"
									placeholder="Nguyễn Văn A"
									fullWidth
									{...register('name', {
										required: 'Vui lòng nhập họ và tên người nhận',
									})}
									error={!!errors.name}
									helperText={errors?.name?.message}
								/>
							</Grid>
						</Grid>
						<Grid container display="flex" alignItems="center" my=".5rem">
							<Grid item xs={12} sm={4}>
								<InputLabel>
									Địa chỉ Email <span style={{ color: 'red' }}>*</span>
								</InputLabel>
							</Grid>
							<Grid item xs={12} sm={8}>
								<TextField
									id="email"
									placeholder="nguyenvana@email.com"
									fullWidth
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
						</Grid>
						{showPhone && (
							<Grid container display="flex" alignItems="center" my=".5rem">
								<Grid item xs={12} sm={4}>
									<InputLabel>Số điện thoại</InputLabel>
								</Grid>
								<Grid item xs={12} sm={8}>
									<TextField
										id="phone"
										placeholder="+84999111222"
										fullWidth
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
							</Grid>
						)}
						<Grid container display="flex" alignItems="center" my=".5rem">
							<Grid item xs={12} sm={4}>
								<InputLabel>
									Quyền hạn <span style={{ color: 'red' }}>*</span>
								</InputLabel>
							</Grid>
							<Grid item xs={12} sm={8}>
								<Controller
									name="permission"
									control={control}
									render={({ ref, value, ...inputProps }) => (
										<TextField
											select
											fullWidth
											variant="outlined"
											size="large"
											fullWidth
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
						</Grid>
						<Grid container display="flex" alignItems="center" my=".5rem">
							<Grid item xs={12} sm={4}>
								<InputLabel>Sử dụng khóa</InputLabel>
							</Grid>
							<Grid item xs={12} sm={8}>
								<TextField
									id="key"
									placeholder="Khóa sẽ gửi qua SĐT người nhận"
									fullWidth
									{...register('key')}
									error={!!errors.key}
									helperText={errors?.key?.message}
									defaultValue={'VT' + randomstring.generate(6)}
								/>
							</Grid>
						</Grid>
						<Grid container display="flex" alignItems="center" my=".5rem">
							<Grid item xs={12} sm={4}>
								<InputLabel>Tin nhắn riêng tư</InputLabel>
							</Grid>
							<Grid item xs={12} sm={8}>
								<TextField
									id="private_message"
									fullWidth
									rows={5}
									rowsMax={10}
									{...register('private_message')}
								/>
							</Grid>
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
				<Grid item md={5} xs={12}>
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
