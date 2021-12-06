import React from 'react';
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

const UserProfileDetails = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	return (
		<Card>
			<CardHeader
				subheader="Những thông tin này có thể chỉnh sửa được"
				title="Thông tin cá nhân"
			/>
			<Divider />
			<CardContent>
				<Grid container spacing={3}>
					<Grid item md={6} xs={12}>
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
					<Grid item md={6} xs={12}>
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
							error={!!errors.email}
							helperText={errors?.email?.message}
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
							{...register('phone', {
								required: 'Vui lòng nhập số điện thoại',
								// pattern: {
								// 	value: REG_PHONE,
								// 	message: 'Số điện thoại phải là số và bắt đầu là 0 hoặc +',
								// },
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
				<Button color="primary" variant="contained">
					Lưu
				</Button>
			</Box>
		</Card>
	);
}

export default UserProfileDetails
