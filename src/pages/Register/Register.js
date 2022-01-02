import React, { useState, useEffect } from 'react';
import {
	Paper,
	Card,
	InputLabel,
	TextField,
	Grid,
	Typography,
	InputAdornment,
	IconButton,
	Divider,
	Box,
	Button,
	Stack,
	Snackbar,
	Alert,
	Loading,
	CircularProgress,
} from '@mui/material';
import './register.scss';
import { Link } from 'react-router-dom';
import { Visibility, VisibilityOff, Google, Facebook } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import Background from '../../assets/images/background2-large.jpg';
import Logo from '../../assets/images/logo-white.png';
import { REG_EMAIL, REG_PHONE, REG_PASSWORD } from '../../components/constants/global.js';
import { useDispatch, useSelector } from 'react-redux';
import { registerAction } from '../../redux/actions/userActions.js';
import { useHistory } from 'react-router-dom';
import { useToast } from '../../components/toast/useToast';

const Register = () => {
	const [hiddenPassword, setHiddenPassword] = useState(true);
	const [hiddenVerifyPassword, setHiddenVerifyPassword] = useState(true);

	const dispatch = useDispatch();

	const { error } = useToast();

	const userRegister = useSelector((state) => state.userRegister);
	const { user, loading, error: errorRegister } = userRegister;

	const history = useHistory();

	useEffect(() => {
		if (user) {
			history.replace('/thank-you');
		}
	}, [user, errorRegister, history]);

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm();

	const doLogin = (formData) => {
		if (formData.password !== formData.verifyPassword) {
			setError('verifyPassword', {
				type: 'manual',
				message: 'Mật khẩu không trùng khớp',
			});
			return;
		}
		// console.log(formData);
		dispatch(
			registerAction(
				formData.email,
				formData.password,
				formData.phone,
				formData.organization,
				formData.address,
				formData.firstName,
				formData.lastName
			)
		);
		// history.push('/login')
	};

	const showError = (errorRegister) => {
		if (errorRegister.status === 409)
			return (
				<p style={{ textAlign: 'center', color: 'red', marginBottom: '2rem' }}>
					Email đã được sử dụng
				</p>
			);
		if (errorRegister.status === 419)
			return (
				<p style={{ textAlign: 'center', color: 'red', marginBottom: '2rem' }}>
					Thiếu trường thông tin
				</p>
			);
		if (errorRegister.status === 500)
			return (
				<p style={{ textAlign: 'center', color: 'red', marginBottom: '2rem' }}>
					Máy chủ gặp trục trặc
				</p>
			);
		return <></>;
	};

	return (
		<div className="register">
			<div className="register-logo">
				<img src={Logo} alt="logo" style={{ width: '15vw', margin: '3rem' }} />
			</div>
			<Paper variant="outlined" className="register-form">
				<p className="register-logo-temp">VTSIGN</p>
				<Typography variant="h5" textAlign="center" fontWeight="bold" my="1rem">
					Đăng ký
				</Typography>
				<form>
					<Grid container spacing={3} style={{ marginBottom: '2rem' }}>
						<Grid item xs={6}>
							<InputLabel>
								Họ và tên đệm <span style={{ color: 'red' }}>*</span>
							</InputLabel>
							<TextField
								id="lastName"
								fullWidth
								placeholder="Nhập họ và tên đệm"
								{...register('lastName', {
									required: 'Vui lòng nhập họ và tên đệm',
								})}
								error={!!errors.lastName}
								helperText={errors?.lastName?.message}
							/>
						</Grid>
						<Grid item xs={6}>
							<InputLabel>
								Tên <span style={{ color: 'red' }}>*</span>
							</InputLabel>
							<TextField
								name="firstName"
								fullWidth
								placeholder="Nhập tên"
								{...register('firstName', {
									required: 'Vui lòng nhập tên',
								})}
								error={!!errors.firstName}
								helperText={errors?.firstName?.message}
							/>
						</Grid>
						<Grid item xs={12}>
							<InputLabel>
								Địa chỉ Email <span style={{ color: 'red' }}>*</span>
							</InputLabel>
							<TextField
								name="email"
								fullWidth
								placeholder="Nhập địa chỉ email"
								{...register('email', {
									required: 'Vui lòng nhập email',
									pattern: {
										value: REG_EMAIL,
										message: 'Email sai định dạng',
									},
								})}
								error={!!errors.email}
								helperText={errors?.email?.message}
							/>
						</Grid>
						<Grid item xs={12}>
							<InputLabel>
								Mật khẩu <span style={{ color: 'red' }}>*</span>
							</InputLabel>
							<TextField
								name="password"
								fullWidth
								type={hiddenPassword ? 'password' : 'text'}
								placeholder="Nhập mật khẩu"
								{...register('password', {
									required: 'Nhập mật khẩu',
									pattern: {
										value: REG_PASSWORD,
										message:
											'Mật khẩu phải tối thiểu 8 ký tự bao gồm chữ hoa, chữ thường, số',
									},
								})}
								error={!!errors.password}
								helperText={errors?.password?.message}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={() => {
													setHiddenPassword(!hiddenPassword);
												}}
												onMouseDown={(event) => {
													event.preventDefault();
												}}
												edge="end"
											>
												{hiddenPassword ? (
													<Visibility />
												) : (
													<VisibilityOff />
												)}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<InputLabel>
								Xác thực mật khẩu <span style={{ color: 'red' }}>*</span>
							</InputLabel>
							<TextField
								name="verifyPassword"
								fullWidth
								type={hiddenVerifyPassword ? 'password' : 'text'}
								placeholder="Nhập xác thực mật khẩu"
								{...register('verifyPassword', {
									required: 'Vui lòng xác nhận mật khẩu',
									pattern: {
										value: REG_PASSWORD,
										message:
											'Mật khẩu phải tối thiểu 8 ký tự bao gồm chữ hoa, chữ thường, số',
									},
								})}
								error={!!errors.verifyPassword}
								helperText={errors?.verifyPassword?.message}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={() => {
													setHiddenVerifyPassword(!hiddenVerifyPassword);
												}}
												onMouseDown={(event) => {
													event.preventDefault();
												}}
												edge="end"
											>
												{hiddenVerifyPassword ? (
													<Visibility />
												) : (
													<VisibilityOff />
												)}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						</Grid>
						<Grid item xs={6}>
							<InputLabel>
								Số điện thoại <span style={{ color: 'red' }}>*</span>
							</InputLabel>
							<TextField
								name="phone"
								fullWidth
								placeholder="Nhập số điện thoại"
								{...register('phone', {
									required: 'Vui lòng nhập số điện thoại',
									pattern: {
										value: REG_PHONE,
										message: 'Số điện thoại phải là số và bắt đầu là 0 hoặc +',
									},
								})}
								error={!!errors.phone}
								helperText={errors?.phone?.message}
							/>
						</Grid>
						<Grid item xs={6}>
							<InputLabel>
								Cơ quan <span style={{ color: 'red' }}>*</span>
							</InputLabel>
							<TextField
								name="organization"
								fullWidth
								placeholder="Nhập cơ quan"
								{...register('organization', {
									required: 'Vui lòng nhập cơ quan',
								})}
								error={!!errors.organization}
								helperText={errors?.organization?.message}
							/>
						</Grid>
						<Grid item xs={12}>
							<InputLabel>
								Địa chỉ <span style={{ color: 'red' }}>*</span>
							</InputLabel>
							<TextField
								name="address"
								fullWidth
								placeholder="Nhập địa chỉ"
								{...register('address', {
									required: 'Vui lòng nhập địa chỉ',
								})}
								error={!!errors.address}
								helperText={errors?.address?.message}
							/>
						</Grid>
					</Grid>
					{errorRegister && showError(errorRegister)}
					<Box mb="1.5rem" style={{ textAlign: 'center' }}>
						{loading ? (
							<CircularProgress />
						) : (
							<Button
								variant="contained"
								color="primary"
								fullWidth
								size="large"
								onClick={handleSubmit(doLogin)}
								type="submit"
							>
								Đăng ký
							</Button>
						)}
					</Box>
					<Divider style={{ marginTop: '2rem', marginBottom: '2rem' }} />
					<p style={{ textAlign: 'center', marginBottom: '2rem' }}>
						Bạn đã có tài khoản?{' '}
						<Link
							exact
							to="/login"
							style={{ color: '#1876D1', textDecoration: 'underline' }}
						>
							Đăng nhập?
						</Link>
					</p>
				</form>
			</Paper>
		</div>
	);
};

export default Register;
