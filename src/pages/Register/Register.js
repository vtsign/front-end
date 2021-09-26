import React, { useState, useEffect } from 'react';
import {
	Paper,
	Card,
	InputLabel,
	TextField,
	Grid,
	Typography,
	InputAdornment,
	IconButton
} from '@mui/material';
import styles from './register.scss';
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useForm } from 'react-hook-form';

const Register = () => {
	const [hiddenPassword, setHiddenPassword] = useState(false);
	const [hiddenVerifyPassword, setHiddenVerifyPassword] = useState(false);

	const hookForm = useForm();

	return (
		<>
			<Paper variant="outlined" className="registerForm">
				<Typography variant="h5">Đăng ký</Typography>
				<form>
					<Grid container spacing={3}>
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
											{hiddenVerifyPassword ? (
												<Visibility />
											) : (
												<VisibilityOff />
											)}
										</IconButton>
									</InputAdornment>
								}
							/>
						</Grid>
						<Grid item xs={12}>
							<InputLabel>
								Xác thực mật khẩu <span style={{ color: 'red' }}>*</span>
							</InputLabel>
							<TextField
								fullWidth
								type={hiddenVerifyPassword ? 'text' : 'password'}
								placeholder="Vui lòng nhập xác thực mật khẩu"
								endAdornment={
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
								}
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
				</form>
			</Paper>
		</>
	);
}

export default Register
