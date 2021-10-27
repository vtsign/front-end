import React, { useState, useEffect } from 'react';
import {
	Box,
	Button,
	Card,
	Divider,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	Paper,
	TextField,
	Typography,
	Stack,
	CircularProgress,
} from '@mui/material';
import './login.scss';
import {
	Visibility,
	VisibilityOff,
	AccountCircle,
	Lock,
	Google,
	Facebook,
} from '@mui/icons-material';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Background from '../../assets/images/background1-large.jpg';
import { REG_EMAIL, REG_PASSWORD } from '../../components/constants/global.js';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../redux/actions/userActions.js';
import Logo from '../../assets/images/logo-white.png';

const Login = () => {
	const [hiddenPassword, setHiddenPassword] = useState(true);

	const dispatch = useDispatch();

	const history = useHistory();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo, loading, error: errorRegister } = userLogin;

	useEffect(() => {
		if (userInfo) history.push('/');
	}, [userInfo, history]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const doLogin = (formData) => {
		// console.log(formData);
		dispatch(loginAction(formData.email, formData.password));
	};

	return (
		<div className="login">
			<div className="login-logo"
			>
				{/* <p className="login-logo">
					VTSIGN
				</p> */}
				<img src={Logo} alt="logo" style={{ width: '15vw', margin: '3rem' }} />
			</div>
			<Paper
				variant="outlined"
				className="login-form"
				style={{ maxHeight: '95vh', overflow: 'auto' }}
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
					{errorRegister && (
						<p style={{ textAlign: 'center', color: 'red', marginBottom: '2rem' }}>
							{errorRegister.message}
						</p>
					)}
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
							>
								Đăng nhập
							</Button>
						)}
					</Box>
					<Typography textAlign="center" my="1rem">
						<Link to="/#" style={{ textDecoration: 'none' }}>
							Bạn đã quên mật khẩu?
						</Link>
					</Typography>
					<Divider style={{ marginTop: '2rem', marginBottom: '2rem' }} />
					<p style={{ textAlign: 'center', marginBottom: '2rem' }}>
						Bạn chưa có tài khoản? <Link to="/register">Đăng ký?</Link>
					</p>
					<Divider style={{ paddingInline: '2rem', marginBottom: '2rem' }}>
						Hoặc đăng nhập với
					</Divider>
					<Box mb="1.5rem">
						<Stack
							direction="row"
							spacing={2}
							display="flex"
							justifyContent="space-between"
						>
							<Button
								variant="outlined"
								fullWidth
								size="large"
								startIcon={<Google />}
							>
								Google
							</Button>
							<Button
								variant="contained"
								fullWidth
								size="large"
								startIcon={<Facebook />}
							>
								Facebook
							</Button>
						</Stack>
					</Box>
				</form>
			</Paper>
		</div>
	);
};

export default Login;
