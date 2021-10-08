import React from 'react';
import {
	Box,
	Stepper,
	Step,
	StepLabel,
	StepContent,
	Button,
	Paper,
	Typography,
	IconButton,
	Divider,
	Checkbox,
	FormControlLabel,
	Grid,
	Container,
	Card,
	CardContent,
	InputLabel,
	TextField,
} from '@mui/material';
import { CloudUpload, InsertDriveFile } from '@mui/icons-material';
import Header from '../../components/Header/Header';

const steps = [
	'Thêm tài liệu (PDF, Word, PNG,...)',
	'Chọn người nhận và cài đặt',
	'Ký tên và các thông tin khác',
	'Kiểm tra và gửi file',
];

export function FirstStep() {
	return (
		<>
			<Grid>
				<Typography variant="h6">Thêm tài liệu</Typography>
			</Grid>
			<Grid display="flex" my="1rem">
				<Grid item lg={8} md={12} xl={9} xs={12} mr="2rem">
					<Card>
						<CardContent>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									flexDirection: 'column',
									minHeight: '60vh',
									backgroundColor: '#FAFAFA',
									color: '#2F80ED',
									cursor: 'pointer',
								}}
							>
								<CloudUpload style={{ fontSize: '4rem' }} />
								<Typography variant="h6">Tải tài liệu</Typography>
							</Box>
						</CardContent>
					</Card>
				</Grid>
				<Grid item lg={4} md={6} xl={3} xs={12}>
					<Card>
						<CardContent>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									flexDirection: 'column',
									minHeight: '60vh',
								}}
							>
								<InsertDriveFile style={{ fontSize: '4rem' }} />
								<Typography variant="h6">Chưa có tài liệu</Typography>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</>
	);
}

export function SecondStep() {
	return (
		<>
			<Grid>
				<Typography variant="h6">Thông tin người nhận</Typography>
			</Grid>
			<Grid display="flex" my="1rem">
				<Grid item lg={8} md={12} xl={7} xs={12} mr="2rem">
					<Card>
						<CardContent>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									minHeight: '60vh',
									color: '#2F80ED',
									cursor: 'pointer',
									margin: '0 2rem',
								}}
							>
								{/* <Grid container spacing={3}>
									<Grid item lg={4} display="flex" flexDirection='column' justifyContent="center">
										<InputLabel>Tên người nhận</InputLabel>
										<InputLabel>Địa chỉ Email</InputLabel>
										<InputLabel>Quyền hạn</InputLabel>
										<InputLabel>Sử dụng khóa</InputLabel>
									</Grid>
									<Grid item lg={8}>
										<TextField
											id="lastName"
											placeholder="Nguyễn Văn A"
											// sx={{ minWidth: '30vw' }}
											fullWidth
											// {...register('lastName', {
											// 	required: 'Vui lòng nhập họ và tên đệm',
											// })}
											// error={!!errors.lastName}
											// helperText={errors?.lastName?.message}
										/>
										<TextField
											id="lastName"
											placeholder="Nguyễn Văn A"
											// sx={{ minWidth: '30vw' }}
											fullWidth
											// {...register('lastName', {
											// 	required: 'Vui lòng nhập họ và tên đệm',
											// })}
											// error={!!errors.lastName}
											// helperText={errors?.lastName?.message}
										/>
										<TextField
											id="lastName"
											placeholder="Nguyễn Văn A"
											// sx={{ minWidth: '30vw' }}
											fullWidth
											// {...register('lastName', {
											// 	required: 'Vui lòng nhập họ và tên đệm',
											// })}
											// error={!!errors.lastName}
											// helperText={errors?.lastName?.message}
										/>
										<div>
										<TextField
											id="lastName"
											placeholder="Nguyễn Văn A"
											// sx={{ minWidth: '30vw' }}
											fullWidth
											// {...register('lastName', {
											// 	required: 'Vui lòng nhập họ và tên đệm',
											// })}
											// error={!!errors.lastName}
											// helperText={errors?.lastName?.message}
										/>
									</Grid>
								</Grid> */}
								<Grid
									display="flex"
									justifyContent="space-between"
									alignItems="center"
									my="1rem"
								>
									<InputLabel>Tên người nhận</InputLabel>
									<TextField
										id="lastName"
										placeholder="Nguyễn Văn A"
										sx={{ minWidth: '25vw' }}
										// fullWidth
										// {...register('lastName', {
										// 	required: 'Vui lòng nhập họ và tên đệm',
										// })}
										// error={!!errors.lastName}
										// helperText={errors?.lastName?.message}
									/>
								</Grid>
								<Grid
									display="flex"
									justifyContent="space-between"
									alignItems="center"
									my="1rem"
								>
									<InputLabel>Địa chỉ Email</InputLabel>
									<TextField
										id="lastName"
										placeholder="Nguyễn Văn A"
										sx={{ minWidth: '25vw' }}
										// fullWidth
										// {...register('lastName', {
										// 	required: 'Vui lòng nhập họ và tên đệm',
										// })}
										// error={!!errors.lastName}
										// helperText={errors?.lastName?.message}
									/>
								</Grid>
								<Grid
									display="flex"
									justifyContent="space-between"
									alignItems="center"
									my="1rem"
								>
									<InputLabel>Quyền hạn</InputLabel>
									<TextField
										id="lastName"
										placeholder="Nguyễn Văn A"
										sx={{ minWidth: '25vw' }}
										// fullWidth
										// {...register('lastName', {
										// 	required: 'Vui lòng nhập họ và tên đệm',
										// })}
										// error={!!errors.lastName}
										// helperText={errors?.lastName?.message}
									/>
								</Grid>
								<Grid
									display="flex"
									justifyContent="space-between"
									alignItems="center"
									my="1rem"
								>
									<InputLabel>Sử dụng khóa</InputLabel>
									<TextField
										id="lastName"
										placeholder="Nguyễn Văn A"
										sx={{ minWidth: '25vw' }}
										// fullWidth
										// {...register('lastName', {
										// 	required: 'Vui lòng nhập họ và tên đệm',
										// })}
										// error={!!errors.lastName}
										// helperText={errors?.lastName?.message}
									/>
								</Grid>
								<Grid
									display="flex"
									justifyContent="flex-end"
									alignItems="center"
									my="1rem"
								>
									<Button variant="contained">Tạo mới</Button>
								</Grid>
							</Box>
						</CardContent>
					</Card>
				</Grid>
				<Grid item lg={4} md={6} xl={5} xs={12}>
					<Card>
						<CardContent>
							<Box
								sx={{
									minHeight: '60vh',
								}}
							>
								<Typography variant="h6">Người nhận</Typography>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</>
	);
}

export function ThirdStep() {
	return (
		<>
			<Grid>
				<Typography variant="h6">Ký tên và các thông tin khác</Typography>
			</Grid>
			<Grid display="flex" my="1rem">
				<Grid item lg={8} md={12} xl={9} xs={12} mr="2rem">
					<Card>
						<CardContent>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									flexDirection: 'column',
									minHeight: '60vh',
									backgroundColor: '#FAFAFA',
									color: '#2F80ED',
									cursor: 'pointer',
								}}
							>
								<CloudUpload style={{ fontSize: '4rem' }} />
								<Typography variant="h6">Tải tài liệu</Typography>
							</Box>
						</CardContent>
					</Card>
				</Grid>
				<Grid item lg={4} md={6} xl={3} xs={12}>
					<Card>
						<CardContent>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									flexDirection: 'column',
									minHeight: '60vh',
								}}
							>
								<InsertDriveFile style={{ fontSize: '4rem' }} />
								<Typography variant="h6">Chưa có tài liệu</Typography>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</>
	);
}

export function LastStep() {
	return (
		<>
			<Grid>
				<Typography variant="h6">Kiểm tra và gửi file</Typography>
			</Grid>
			<Grid display="flex" my="1rem">
				<Grid item lg={8} md={12} xl={9} xs={12} mr="2rem">
					<Card>
						<CardContent>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									flexDirection: 'column',
									minHeight: '60vh',
									backgroundColor: '#FAFAFA',
									color: '#2F80ED',
									cursor: 'pointer',
								}}
							>
								<CloudUpload style={{ fontSize: '4rem' }} />
								<Typography variant="h6">Tải tài liệu</Typography>
							</Box>
						</CardContent>
					</Card>
				</Grid>
				<Grid item lg={4} md={6} xl={3} xs={12}>
					<Card>
						<CardContent>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									flexDirection: 'column',
									minHeight: '60vh',
								}}
							>
								<InsertDriveFile style={{ fontSize: '4rem' }} />
								<Typography variant="h6">Chưa có tài liệu</Typography>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</>
	);
}

const Signing = () => {
	const [activeStep, setActiveStep] = React.useState(0);
	const [skipped, setSkipped] = React.useState(new Set());

	const isStepOptional = (step) => {
		return step === 1;
	};

	const isStepSkipped = (step) => {
		return skipped.has(step);
	};

	const handleNext = () => {
		let newSkipped = skipped;
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values());
			newSkipped.delete(activeStep);
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped(newSkipped);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleSkip = () => {
		if (!isStepOptional(activeStep)) {
			// You probably want to guard against something like this,
			// it should never occur unless someone's actively trying to break something.
			throw new Error("You can't skip a step that isn't optional.");
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped((prevSkipped) => {
			const newSkipped = new Set(prevSkipped.values());
			newSkipped.add(activeStep);
			return newSkipped;
		});
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	return (
		<>
			<Header />
			{/* <Grid container spacing={3} style={{ minHeight: '84vh', margin: 'auto'}}>
				<Box
					sx={{
						display: 'flex',
						flexWrap: 'wrap',
						'& > :not(style)': {
							m: 2,
						},
					}}
				>
					<Grid
						item
						xs={12}
						md={4}
						lg={3}
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							margin: 'auto'
						}}
					>
						<Box
							sx={{
								orientation: 'vertical',
								// width: '100%',
								// minWidth: '20vw',
								// minHeight: '80vh',
								margin: 'auto',
							}}
						>
							<Stepper activeStep={activeStep} orientation="vertical">
								{steps.map((label, index) => {
									const stepProps = {};
									const labelProps = {};

									return (
										<Step key={index} {...stepProps}>
											<StepLabel {...labelProps}>{label}</StepLabel>
										</Step>
									);
								})}
							</Stepper>
						</Box>
					</Grid>
					<Divider orientation="vertical"/>
					<Grid item xs={12} md={8} lg={9}>
						<Box
							sx={{
								// width: '100%',
								// minWidth: '70vw',
								// minHeight: '75vh',
								// padding: '1.5rem',
							}}
						>
							<Typography variant="h6">Thêm tài liệu</Typography>
							<Box
								sx={{
									display: 'flex',
									flexWrap: 'wrap',
									'& > :not(style)': {
										mr: 2,
									},
								}}
							>
								<Paper
									sx={{
										// display: 'flex',
										// flexDirection: 'column',
										// justifyContent: 'center',
										// alignItems: 'center',
										// width: '100%',
										// maxWidth: '50vw',
										// minHeight: '60vh',
										// cursor: 'pointer',
										// color: 'blue',
										margin: 'auto'
									}}
									onClick={() => {
										console.log('a');
									}}
								>
									<CloudUpload style={{ fontSize: '5rem' }} />
									<Typography variant="h6">Tải tài liệu</Typography>
								</Paper>
								<Paper>
									<Paper
										sx={{
											// display: 'flex',
											// flexDirection: 'column',
											// justifyContent: 'center',
											// alignItems: 'center',
											// width: '100%',
											// minWidth: '18vw',
											// minHeight: '60vh',
											// cursor: 'pointer',
											margin: 'auto'
										}}
									>
										<InsertDriveFile style={{ fontSize: '5rem' }} />
										<Typography variant="h6">Chưa có tài liệu</Typography>
									</Paper>
								</Paper>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'flex-end',
										width: '95%',
										marginTop: '2rem',
									}}
								>
									<FormControlLabel
										control={<Checkbox />}
										label="Chỉ mình tôi ký"
									/>
									<Button variant="contained" onClick={handleNext}>
										{activeStep === steps.length - 1 ? 'Hoàn tất' : 'Tiếp tục'}
									</Button>
								</Box>
							</Box>
						</Box>
					</Grid>
				</Box>
			</Grid> */}
			<Container maxWidth={false}>
				<Grid container spacing={0}>
					<Grid item lg={3} sm={6} xl={3} xs={12} display="flex" alignItems="center">
						<Stepper activeStep={activeStep} orientation="vertical">
							{steps.map((label, index) => {
								const stepProps = {};
								const labelProps = {};

								return (
									<Step key={index} {...stepProps}>
										<StepLabel {...labelProps}>{label}</StepLabel>
									</Step>
								);
							})}
						</Stepper>
					</Grid>
					<Grid item lg={8} sm={6} xl={9} xs={12}>
						{activeStep === 0 && <FirstStep />}
						{activeStep === 1 && <SecondStep />}
						{activeStep === 2 && <ThirdStep />}
						{activeStep === 3 && <LastStep />}
						<Grid display="flex" justifyContent="flex-end">
							<FormControlLabel control={<Checkbox />} label="Chỉ mình tôi ký" />
							<Button variant="contained" onClick={handleNext}>
								{activeStep === steps.length - 1 ? 'Hoàn tất' : 'Tiếp tục'}
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</>
	);
};

export default Signing;
