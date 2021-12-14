import React, { useState, useRef } from 'react';
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
} from '@mui/material';
import './ChangePassword.scss';
import { useForm } from 'react-hook-form';
import { useToast } from '../../components/toast/useToast.js';
import { REG_PASSWORD } from '../../components/constants/global.js';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import userApi from '../../api/userApi';
import { useHistory } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';

const ChangePassword = () => {
	const [oldPasswordHidden, setOldPasswordHidden] = useState(true);
	const [hiddenPassword, setHiddenPassword] = useState(true);
	const [hiddenVerifyPassword, setHiddenVerifyPassword] = useState(true);
	const [loading, setLoading] = useState(false);


	const { register, handleSubmit, formState: { errors }, watch } = useForm();
	const history = useHistory();
	const currentPassword = useRef({});
	currentPassword.current = watch("password", "");

	const { success, error } = useToast();

	const changePassword = async formData => {
		setLoading(true);
		try {
			const response = await userApi.changePassword({
				old_password: formData.oldPassword,
				new_password: formData.password
			});
			setLoading(false);
			if(response.status === 200) {
				success("Đổi mật khẩu thành công");
				history.push("/");
			}
		} catch(err) {
			setLoading(false);
			error("Đã có lỗi xảy ra")
		}
	}
	return (
		<div className="form">
			<Paper variant="outlined" className="change-password__form">
				<Typography variant="h5" textAlign="center" fontWeight="bold" my="1rem">
					Đổi mật khẩu
				</Typography>
				{loading && <Loading />}
				<form>
					<Grid container spacing={3} style={{ marginBottom: '2rem' }}>
						<Grid item xs={12}>
							<InputLabel>
								Mật khẩu cũ<span style={{ color: 'red' }}>*</span>
							</InputLabel>
							<TextField
								name="oldPassword"
								fullWidth
								type={oldPasswordHidden ? 'password' : 'text'}
								placeholder="Nhập mật khẩu"
								{...register('oldPassword', {
									required: 'Nhập mật khẩu',
									pattern: {
										value: REG_PASSWORD,
										message:
											'Mật khẩu phải tối thiểu 8 ký tự bao gồm chữ hoa, chữ thường, số',
									},
								})}
								error={!!errors.oldPassword}
								helperText={errors?.oldPassword?.message}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={() => {
													setOldPasswordHidden(!oldPasswordHidden);
												}}
												onMouseDown={(event) => {
													event.preventDefault();
												}}
												edge="end"
											>
												{oldPasswordHidden ? (
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
								Mật khẩu mới<span style={{ color: 'red' }}>*</span>
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
								Xác thực mật khẩu mới<span style={{ color: 'red' }}>*</span>
							</InputLabel>
							<TextField
								name="verifyPassword"
								fullWidth
								type={hiddenVerifyPassword ? 'password' : 'text'}
								placeholder="Nhập xác thực mật khẩu"
								{...register('verifyPassword', {
									required: 'Vui lòng xác nhận mật khẩu',
									validate: (value) =>
										value === currentPassword.current || 'Mật khẩu chưa khớp',
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
					</Grid>
					<Box mb="1.5rem" style={{ textAlign: 'center' }}>
						<Button
							variant="contained"
							color="primary"
							fullWidth
							size="large"
							onClick={handleSubmit(changePassword)}
							type="submit"
						>
							Đổi mật khẩu
						</Button>
					</Box>
				</form>
			</Paper>
		</div>
	);
};

export default ChangePassword;
