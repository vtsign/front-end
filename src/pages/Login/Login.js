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
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Login = () => {
	const [hiddenPassword, setHiddenPassword] = useState(false);

	const hookForm = useForm();

	return (
		<>
			<Paper variant="outlined" className="loginForm">
				<Typography variant="h5">Đăng nhập</Typography>
				<form>
					<Grid container spacing={3} mb="1.5em">
						<Grid item xs={12}>
							<InputLabel>
								Địa chỉ Email <span style={{ color: 'red' }}>*</span>
							</InputLabel>
							<TextField fullWidth placeholder="Vui lòng nhập địa chỉ email" />
						</Grid>
						<Grid item xs={12}>
							<InputLabel>
								Mật khẩu <span style={{ color: 'red' }}>*</span>
							</InputLabel>
							<TextField
								fullWidth
								type={hiddenPassword ? 'text' : 'password'}
								placeholder="Vui lòng nhập mật khẩu"
								endAdornment={
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
											{hiddenPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								}
							/>
						</Grid>
					</Grid>
					<Box mb="1.5em">
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
					<Link href="">Bạn đã quên mật khẩu?</Link>
					<Divider />
					<p>
						Bạn chưa có tài khoản? <Link href="">Đăng ký?</Link>
					</p>
					<p>Hoặc đăng nhập với</p>
				</form>
			</Paper>
		</>
	);
};

export default Login;
