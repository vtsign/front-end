import React, { useState } from 'react';
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	TextField,
	InputLabel
} from '@mui/material';
import { useForm } from 'react-hook-form';
import userApi from '../../api/userApi';
import { useToast } from '../toast/useToast';
import { useHistory } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { REG_PHONE } from '../../components/constants/global.js';


const UserProfileDetails = ({ userInfo }) => {
	const [loading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { success, error } = useToast();
	const history = useHistory();

	const onSubmitChange = async formData => {
		setLoading(true);
		try {
			const updateProfileResponse = await userApi.updateUserProfile(formData);
			if(updateProfileResponse.status === 200)
				success("Cập nhật thông tin tài khoản thành công");
				setLoading(false);
				history.go(0);

		} catch (err) {
			setLoading(false);
		}

	}
	return (
		<Card>
			<CardHeader
				subheader="Những thông tin này có thể chỉnh sửa được"
				title="Thông tin cá nhân"
			/>
			<Divider />
			<CardContent>
				{loading && <Loading />}
				<Grid container spacing={3}>
					<Grid item md={6} xs={12}>
						<InputLabel>
							Họ và tên đệm <span style={{ color: 'red' }}>*</span>
						</InputLabel>
						<TextField
							id="lastName"
							fullWidth
							placeholder="Nhập họ và tên đệm"
							defaultValue={userInfo.last_name}
							{...register('last_name', {
								required: 'Vui lòng nhập họ và tên đệm',
							})}
							error={!!errors.lastName}
							helperText={errors?.lastName?.message}
						/>
					</Grid>
					<Grid item md={6} xs={12}>
						<InputLabel>
							Tên <span style={{ color: 'red' }}>*</span>
						</InputLabel>
						<TextField
							name="firstName"
							fullWidth
							placeholder="Nhập tên"
							defaultValue={userInfo.first_name}
							{...register('first_name', {
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
							defaultValue={userInfo.email}
							InputProps={{
								readOnly: true,
							}}
						/>
					</Grid>
					<Grid item md={6} xs={12}>
						<InputLabel>
							Số điện thoại <span style={{ color: 'red' }}>*</span>
						</InputLabel>
						<TextField
							name="phone"
							fullWidth
							placeholder="Nhập số điện thoại"
							defaultValue={userInfo.phone}
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
					<Grid item md={6} xs={12}>
						<InputLabel>
							Cơ quan <span style={{ color: 'red' }}>*</span>
						</InputLabel>
						<TextField
							name="organization"
							fullWidth
							placeholder="Nhập cơ quan"
							defaultValue={userInfo.organization}
							{...register('organization', {
								required: 'Vui lòng nhập cơ quan',
							})}
							error={!!errors.organization}
							helperText={errors?.organization?.message}
						/>
					</Grid>
					<Grid item md={12}>
						<InputLabel>
							Địa chỉ <span style={{ color: 'red' }}>*</span>
						</InputLabel>
						<TextField
							name="address"
							fullWidth
							placeholder="Nhập địa chỉ"
							defaultValue={userInfo.address}
							{...register('address', {
								required: 'Vui lòng nhập địa chỉ',
							})}
							error={!!errors.address}
							helperText={errors?.address?.message}
						/>
					</Grid>
				</Grid>
			</CardContent>
			<Divider />
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'flex-end',
					p: 2,
				}}
			>
				<Button
					color="primary"
					variant="contained"
					type="submit"
					onClick={handleSubmit(onSubmitChange)}
				>
					Lưu
				</Button>
			</Box>
		</Card>
	);
}

export default UserProfileDetails
