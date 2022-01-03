import {
	AccountCircle,
	Facebook,
	Google,
	Lock,
	Visibility,
	VisibilityOff,
} from '@mui/icons-material';
import {
	Box,
	Button,
	CircularProgress,
	Divider,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	Paper,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../../assets/images/logo-white.png';
import { REG_EMAIL, REG_PASSWORD } from '../../components/constants/global.js';
import { loginAction } from '../../redux/actions/userActions.js';
import './login.scss';
import { useToast } from '../../components/toast/useToast';

const Login = () => {
	const [hiddenPassword, setHiddenPassword] = useState(true);

	const dispatch = useDispatch();

	const history = useHistory();

	const { error } = useToast();

	const userLogin = useSelector((state) => state.userLogin);
	const { user, loading, error: errorRegister, isLogin } = userLogin;

	useEffect(() => {
		localStorage.setItem("isLogin", false);
	}, []);

	useEffect(() => {
		if (isLogin) history.push('/');
	}, [user, history, isLogin]);

	// useEffect(() => {
	// 	switch (errorRegister.status) {
	// 		case 401:
	// 			error('Email và mật khẩu không hợp lệ');
	// 			break;
	// 		case 419:
	// 			error('Thiếu email hoặc password');
	// 			break;
	// 		case 423:
	// 			error('Tài khoản chưa được kích hoạt');
	// 			break;
	// 		case 500:
	// 			error('Máy chủ gặp trục trặc');
	// 			break;
	// 		default:
	// 			error('Đã có lỗi xảy ra');
	// 			break;
	// 	}
	// }, [errorRegister.status])

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const doLogin = (formData) => {
		dispatch(loginAction(formData.email, formData.password));
	};

	const showError = (errorRegister) => {
		if (errorRegister.status === 403)
			return (
				<p style={{ textAlign: 'center', color: 'red', marginBottom: '2rem' }}>
					Email hoặc mật khẩu không hợp lệ
				</p>
			);
		if (errorRegister.status === 419)
			return (
				<p style={{ textAlign: 'center', color: 'red', marginBottom: '2rem' }}>
					Thiếu thông tin Email hoặc mật khẩu
				</p>
			);
		if (errorRegister.status === 423)
			return (
				<p style={{ textAlign: 'center', color: 'red', marginBottom: '2rem' }}>
					Tài khoản chưa được kích hoạt
				</p>
			);
		if (errorRegister.status === 500)
			return (
				<p style={{ textAlign: 'center', color: 'red', marginBottom: '2rem' }}>
					Máy chủ gặp trục trặc
				</p>
			);
		return <></>;
	}

	return (
		<div className="login">
			<div className="login-logo">
				{/* <p className="login-logo">
					VTSIGN
				</p> */}
				<img src={Logo} alt="logo" style={{ width: '15vw', margin: '3rem' }} />
			</div>
			<Paper
				variant="outlined"
				className="login-form"
			>
				<p className="login-logo-temp">
					VTSIGN
				</p>
				<Typography variant="h5" textAlign="center" fontWeight="bold" my="1rem">
					Đăng nhập
				</Typography>
				<form>
					<Grid container spacing={3} mb="2rem">
						<Grid item xs={12}>
							<InputLabel>
								Địa chỉ Email <span style={{ color: 'red' }}>*</span>
							</InputLabel>
							<TextField
								fullWidth
								placeholder="Vui lòng nhập địa chỉ email"
								{...register('email', {
									required: 'Vui lòng nhập email',
									pattern: {
										value: REG_EMAIL,
										message: 'Email sai định dạng',
									},
								})}
								error={!!errors.email}
								helperText={errors?.email?.message}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<AccountCircle />
										</InputAdornment>
									),
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<InputLabel>
								Mật khẩu <span style={{ color: 'red' }}>*</span>
							</InputLabel>
							<TextField
								fullWidth
								type={hiddenPassword ? 'password' : 'text'}
								placeholder="Vui lòng nhập mật khẩu"
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
									startAdornment: (
										<InputAdornment position="start">
											<Lock />
										</InputAdornment>
									),
								}}
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
								Đăng nhập
							</Button>
						)}
					</Box>
					<Typography textAlign="center" my="1rem">
						<Link to="/request-reset-password" style={{ textDecoration: 'none' }}>
							Bạn đã quên mật khẩu?
						</Link>
					</Typography>
					<Divider style={{ marginTop: '2rem', marginBottom: '2rem' }} />
					<p style={{ textAlign: 'center', marginBottom: '2rem' }}>
						Bạn chưa có tài khoản? <Link to="/register">Đăng ký?</Link>
					</p>
				</form>
			</Paper>
		</div>
	);
};

export default Login;
