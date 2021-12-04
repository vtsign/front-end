import {
	Box,
	Card,
	CardContent,
	Grid,
	InputLabel,
	TextField,
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	IconButton,
	MenuItem,
	Button,
	CircularProgress,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { Close } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReceiverAvatar from '../../ReceiverAvatar/ReceiverAvatar';
import { updatePrivateMessage } from '../../../redux/actions/receiverActions';
import { useToast } from '../../toast/useToast';
import Loading from '../../Loading/Loading';

const SendFiles = ({ register, errors, control, handleSubmit, loading }) => {
	const [openModal, setOpenModal] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [privateMessage, setPrivateMessage] = useState('');
	const [currentAssignee, setCurrentAssignee] = useState(null);

	const dispatch = useDispatch();
	// const {
	// 	register,
	// 	handleSubmit,
	// 	formState: { errors },
	// 	getValues
	// } = useForm();
	const receivers = useSelector((state) => state.receivers.receivers);
	// const loading = useSelector((state) => state.addDocList.loading);

	const { success } = useToast();

	// const [currentPrivateMessage, setCurrentPrivateMessage] = useState(receivers[0].private_message);

	// useEffect(() => {
	// 	console.log(getValues());
	// }, [getValues, getValues()])

	const handleOpenModal = () => {};

	useEffect(() => {
		receivers.forEach((receiver, index) => {
			if (receiver.email === currentAssignee) setCurrentIndex(index);
		});
		// console.log(currentPrivateMessage)
	}, [currentAssignee, receivers]);

	const handleUpdatePrivateMessage = () => {
		dispatch(updatePrivateMessage(privateMessage, currentIndex));
		success('Thêm tin nhắn riêng tư thành công');
		setOpenModal(false);
	};

	return (
		<>
			<Grid>
				<Typography variant="h6" my="1rem">
					Kiểm tra và gửi file
				</Typography>
			</Grid>

			<Grid display="flex" my="1rem">
				<Grid item lg={8} md={12} xl={7} xs={12} mr="2rem">
					{loading && <Loading />}
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
						<Typography
							style={{ alignSelf: 'flex-end' }}
							onClick={() => setOpenModal(true)}
						>
							Thêm tin nhắn riêng tư
						</Typography>
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
						<Grid display="flex" justifyContent="space-between" my="1rem">
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
									<ReceiverAvatar
										receiver={partner}
										key={index}
										hideButton={true}
									/>
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
				<Dialog open={openModal} fullWidth={true} onClose={() => setOpenModal(false)}>
					<DialogTitle id={'modal' + '-dialog-title'} onClose={() => setOpenModal(false)}>
						{`Thêm tin nhắn riêng tư`}
						<IconButton
							aria-label="close"
							onClick={() => setOpenModal(false)}
							style={{ position: 'absolute', top: '1px', right: '1px' }}
						>
							<Close />
						</IconButton>
					</DialogTitle>
					<DialogContent dividers>
						<Grid item xs={12} sm={6} marginBottom="1rem">
							<Typography
								style={{ fontWeight: 'bold' }}
								color="textPrimary"
								gutterBottom
							>
								Đến:
							</Typography>
							<Controller
								name="receiver"
								control={control}
								render={({ ref, value, ...inputProps }) => (
									<TextField
										select
										fullWidth
										variant="outlined"
										size="small"
										{...inputProps}
										inputRef={ref}
										value={value}
										defaultValue={receivers[0].email ?? ''}
										SelectProps={{ displayEmpty: true }}
										onChange={(e) => {
											setCurrentAssignee(e.target.value);
											// setCurrentPrivateMessage(receivers[currentIndex].private_message)
										}}
									>
										{receivers.map((receiver, index) => (
											<MenuItem
												name={index}
												key={index}
												value={receiver.email}
											>
												{receiver.name}
											</MenuItem>
										))}
									</TextField>
								)}
							/>
						</Grid>
						<TextField
							name="private_message"
							fullWidth={true}
							multiline
							rows={5}
							rowsMax={10}
							// value={currentPrivateMessage}
							// {...register('private_message', {
							// 	required: 'Vui lòng nhập tin nhắn riêng tư',
							// })}
							// error={!!errors.message}
							// helperText={errors?.message?.message}
							onChange={(e) => setPrivateMessage(e.target.value)}
						/>
					</DialogContent>
					<DialogActions>
						<Button
							autoFocus
							color="primary"
							variant={'contained'}
							onClick={handleUpdatePrivateMessage}
						>
							Xác nhận
						</Button>
						<Button onClick={() => setOpenModal(false)} variant={'outlined'}>
							Trở lại
						</Button>
					</DialogActions>
				</Dialog>
			</Grid>
		</>
	);
};

export default SendFiles;
