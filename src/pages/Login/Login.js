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
} from '@mui/material';
import './login.scss';
import { Visibility, VisibilityOff, AccountCircle, Lock } from '@mui/icons-material';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Login = () => {
	const [hiddenPassword, setHiddenPassword] = useState(true);

	const hookForm = useForm();

	return (
		<>
			<Paper variant="outlined" className="loginForm">
				<Typography variant="h5" textAlign="center" fontWeight="bold" my="1rem">
					Đăng nhập
				</Typography>
				<form>
					<Grid container spacing={3} mb="1.5rem">
						<Grid item xs={12}>
							<InputLabel>
								Địa chỉ Email <span style={{ color: 'red' }}>*</span>
							</InputLabel>
							<TextField
								name="email"
								fullWidth
								placeholder="Vui lòng nhập địa chỉ email"
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<AccountCircle />
										</InputAdornment>
									),
								}}
								// inputRef={hookForm.register({
								// 	required: 'Vui lòng nhập tên đăng nhập',
								// 	// validate: (value) =>
								// 	// 	(REG_USERNAME.test(value?.trim()) &&
								// 	// 		value?.trim().length >= 6) ||
								// 	// 	'Tên đăng nhập 6-50 ký tự, chỉ bao gồm chữ, số và các ký tự đặc biệt @ . _ - (bắt đầu là chữ hoăc số)',
								// })}
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
							// onClick={handleSubmit(doLogin)}
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
						<Link href="#">Bạn đã quên mật khẩu?</Link>
					</Typography>
					<Divider style={{ marginTop: '2rem', marginBottom: '2rem' }} />
					<p style={{ textAlign: 'center', marginBottom: '2rem' }}>
						Bạn chưa có tài khoản? <Link href="#">Đăng ký?</Link>
					</p>
					<Divider style={{ paddingInline: '2rem' }}>Hoặc đăng nhập với</Divider>
				</form>
			</Paper>
		</>
	);
};

export default Login;
