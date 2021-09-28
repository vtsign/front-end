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
	Stack
} from '@mui/material';
import './register.scss';
import { Link } from 'react-router-dom';
import { Visibility, VisibilityOff, Google, Facebook } from '@mui/icons-material'
import { useForm } from 'react-hook-form';
import Background from '../../assets/images/background2-large.jpg'

const Register = () => {
	const [hiddenPassword, setHiddenPassword] = useState(true);
	const [hiddenVerifyPassword, setHiddenVerifyPassword] = useState(true);

	const hookForm = useForm();

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
			<Paper variant="outlined" className="registerForm">
				<Typography variant="h5" textAlign="center" fontWeight="bold" my="1rem">
					Đăng ký
				</Typography>
				<form>
					<Grid container spacing={3} style={{ marginBottom: '2rem' }}>
						<Grid item xs={6}>
							<InputLabel>
								Họ và tên đệm <span style={{ color: 'red' }}>*</span>
							</InputLabel>
							<TextField fullWidth placeholder="Vui lòng nhập họ và tên đệm" />
						</Grid>
						<Grid item xs={6}>
							<InputLabel>
								Tên <span style={{ color: 'red' }}>*</span>
							</InputLabel>
							<TextField fullWidth placeholder="Vui lòng nhập tên" />
						</Grid>
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
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<InputLabel>
								Xác thực mật khẩu <span style={{ color: 'red' }}>*</span>
							</InputLabel>
							<TextField
								fullWidth
								type={hiddenVerifyPassword ? 'password' : 'text'}
								placeholder="Vui lòng nhập xác thực mật khẩu"
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
							<TextField fullWidth placeholder="Vui lòng nhập số điện thoại" />
						</Grid>
						<Grid item xs={6}>
							<InputLabel>
								Chức vụ <span style={{ color: 'red' }}>*</span>
							</InputLabel>
							<TextField fullWidth placeholder="Vui lòng nhập chức vụ" />
						</Grid>
						<Grid item xs={12}>
							<InputLabel>
								Ngành nghề <span style={{ color: 'red' }}>*</span>
							</InputLabel>
							<TextField fullWidth placeholder="Vui lòng nhập ngành nghề" />
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
					<Divider style={{ marginTop: '2rem', marginBottom: '2rem' }} />
					<p style={{ textAlign: 'center', marginBottom: '2rem' }}>
						Bạn đã có tài khoản? <Link href="#">Đăng nhập?</Link>
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
}

export default Register
