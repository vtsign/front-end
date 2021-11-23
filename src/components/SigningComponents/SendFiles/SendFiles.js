import {
	Box, Card,
	CardContent, Grid,
	InputLabel, TextField, Typography
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import ReceiverAvatar from '../../ReceiverAvatar/ReceiverAvatar';


const SendFiles = ({ register, errors }) => {

	// const {
	// 	register,
	// 	handleSubmit,
	// 	formState: { errors },
	// 	getValues
	// } = useForm();
	const receivers = useSelector(state => state.receivers.receivers)

	// useEffect(() => {
	// 	console.log(getValues());
	// }, [getValues, getValues()])

	return (
		<>
			<Grid>
				<Typography variant="h6" my="1rem">
					Kiểm tra và gửi file
				</Typography>
			</Grid>
			<Grid display="flex" my="1rem">
				<Grid item lg={8} md={12} xl={7} xs={12} mr="2rem">
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							// minHeight: '60vh',
							color: '#2F80ED',
							cursor: 'pointer',
							margin: '0 2rem',
						}}
					>
						<Grid
							display="flex"
							justifyContent="space-between"
							alignItems="center"
							my="1rem"
						>
							<InputLabel>Chủ đề Email</InputLabel>
							<TextField
								id="title"
								placeholder="Chủ để Email"
								sx={{ minWidth: '25vw' }}
								{...register('title', {
									required: 'Vui lòng nhập chủ đề Email',
								})}
								error={!!errors.title}
								helperText={errors?.title?.message}
							/>
						</Grid>
						<Grid
							display="flex"
							justifyContent="space-between"
							my="1rem"
						>
							<InputLabel>Thông điệp Email</InputLabel>
							<TextField
								id="message"
								placeholder="Thông điệp"
								sx={{ minWidth: '25vw' }}
								multiline
								rows={5}
								rowsMax={10}
								{...register('message', {
									required: 'Vui lòng nhập thông điệp Email',
								})}
								error={!!errors.message}
								helperText={errors?.message?.message}
							/>
						</Grid>
					</Box>
				</Grid>
				<Grid item lg={4} md={6} xl={5} xs={12}>
					<Card>
						<CardContent>
							{receivers.length > 0 ? (
								receivers.map((partner, index) => (
									<ReceiverAvatar receiver={partner} key={index} hideButton={true} />
								))
							) : (
								<div
									style={{
										height: '400px',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									<span>Chưa chọn có người nhận</span>
								</div>
							)}
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</>
	);
};

export default SendFiles;
