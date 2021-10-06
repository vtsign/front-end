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
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Background from '../../assets/images/background1-large.jpg';
import { REG_EMAIL, REG_PASSWORD } from "../../components/global.js"

const Login = () => {
	const [hiddenPassword, setHiddenPassword] = useState(true);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const doLogin = (formData) => {
		console.log(formData);
	};

	return (
		<div
			style={{
				height: '95vh',
				backgroundImage: `url(${Background})`,
				backgroundPosition: 'center',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				display: 'flex',
				justifyContent: 'flex-end',
			}}
		>
			<Paper
				variant="outlined"
				className="loginForm"
				style={{ maxHeight: '95vh', overflow: 'auto' }}
			>
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
					<Box mb="1.5rem">
						<Button
							variant="contained"
							color="primary"
							fullWidth
							size="large"
							onClick={handleSubmit(doLogin)}
						>
							{/* {buttonLoading && (
								<CircularProgress
									size={22}
									style={{ color: 'white', marginRight: 7 }}
								/>
							)} */}
							Đăng nhập
						</Button>
					</Box>
					<Typography textAlign="center" my="1rem">
						<Link href="#" style={{ textDecoration: 'none' }}>
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
