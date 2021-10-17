import React, { useState, useRef, useEffect } from 'react';
import {
	Avatar,
	Box,
	Stepper,
	Step,
	StepLabel,
	Button,
	Typography,
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
import { useForm } from 'react-hook-form';
import Header from '../../components/Header/Header';
import WebViewer from '@pdftron/webviewer';
import '@pdftron/webviewer/public/core/CoreControls';
import ReceiverAvatar from '../../components/ReceiverAvatar/ReceiverAvatar';

const steps = [
	'Thêm tài liệu (PDF, Word, PNG,...)',
	'Chọn người nhận và cài đặt',
	'Ký tên và các thông tin khác',
	'Kiểm tra và gửi file',
];

export function FirstStep({ filePicker, fileData, setFileData }) {
	const setThumbnail = async (dataFile, object) => {
		const Object = object;
		const coreControls = window.CoreControls;
		coreControls.setWorkerPath('/webviewer/core');
		const doc = await coreControls.createDocument(dataFile, {
			extension: 'pdf',
		});

		Object.pageCount = doc.getPageCount();
		doc.loadCanvasAsync({
			pageNumber: 1,
			drawComplete: (canvas) => {
				Object.thumbnailData = canvas.toDataURL();
				setFileData(Object);
			},
		});
	};

	const handleSelectFile = (e) => {
		const { files } = e.target;

		const element = files[0];
		const reader = new FileReader();
		const selectedFile = {
			name: element.name,
		};
		reader.readAsDataURL(element);
		reader.onload = (event) => {
			selectedFile.data = event.target.result;
			setThumbnail(event.target.result, selectedFile);
		};
	};

	return (
		<>
			<Grid my="1rem">
				<Typography variant="h6">Thêm tài liệu</Typography>
			</Grid>
			<Grid display="flex" my="1rem">
				<Grid item lg={8} md={12} xl={9} xs={12} mr="2rem">
					<Card
						onClick={() => {
							if (filePicker) {
								filePicker.current.click();
							}
						}}
					>
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
								<CloudUpload style={{ fontSize: '6rem' }} />
								<Typography variant="h6">Tải tài liệu</Typography>
							</Box>
						</CardContent>
					</Card>
					<input
						type="file"
						ref={filePicker}
						onChange={handleSelectFile}
						style={{ display: 'none' }}
					/>
					{/* <Card>
						<CardContent>
							<div
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
								<Button
									variant="h6"
									onClick={() => {
										if (filePicker) {
											filePicker.current.click();
										}
									}}
								>
									Tải tài liệu
								</Button>
							</div>
						</CardContent>
						<input
							type="file"
							ref={filePicker}
							onChange={handleSelectFile}
							style={{ display: 'none' }}
						/>
					</Card> */}
				</Grid>
				<Grid item lg={4} md={6} xl={3} xs={12}>
					{/* <Card>
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
								<InsertDriveFile style={{ fontSize: '6rem' }} />
								<Typography variant="h6">Chưa có tài liệu</Typography>
							</Box>
						</CardContent>
					</Card> */}
					{fileData && (
						<div className="preview-file">
							<div
								// data-id={index}
								className="preview-file__item"
								style={{ marginBottom: '1rem' }}
							>
								<div className="preview-file__thumbnail">
									<img
										alt=""
										src={fileData.thumbnailData}
										style={{
											height: '100%',
											width: '100%',
											objectFit: 'contain',
										}}
									/>
								</div>
								<div className="info">
									<span style={{ fontWeight: 'bold', wordWrap: 'break-word' }}>
										{fileData.name}
									</span>
								</div>
							</div>
						</div>
					)}
				</Grid>
			</Grid>
		</>
	);
}

export function SecondStep({ receivers, setReceivers }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const addReceivers = (formData) => {
		console.log(formData);
		setReceivers([...receivers, formData]);
		console.log(receivers);
	};

	return (
		<>
			<Grid>
				<Typography variant="h6" my="1rem">
					Thông tin người nhận
				</Typography>
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
										id="receiver"
										placeholder="Nguyễn Văn A"
										sx={{ minWidth: '25vw' }}
										{...register('receiver', {
											required: 'Vui lòng nhập họ và tên người nhận',
										})}
										error={!!errors.receiver}
										helperText={errors?.receiver?.message}
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
										id="email"
										placeholder="Nguyễn Văn A"
										sx={{ minWidth: '25vw' }}
										{...register('email', {
											required: 'Vui lòng nhập địa chỉ Email',
										})}
										error={!!errors.email}
										helperText={errors?.email?.message}
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
										id="privilege"
										placeholder="Nguyễn Văn A"
										sx={{ minWidth: '25vw' }}
										{...register('privilege', {
											required: 'Lựa chọn quyền hạn',
										})}
										error={!!errors.privilege}
										helperText={errors?.privilege?.message}
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
										id="key"
										placeholder="Nguyễn Văn A"
										sx={{ minWidth: '25vw' }}
										{...register('key')}
										// error={!!errors.key}
										// helperText={errors?.key?.message}
									/>
								</Grid>
								<Grid
									display="flex"
									justifyContent="flex-end"
									alignItems="center"
									my="1rem"
								>
									<Button
										variant="contained"
										onClick={handleSubmit(addReceivers)}
									>
										Tạo mới
									</Button>
								</Grid>
							</Box>
						</CardContent>
					</Card>
				</Grid>
				<Grid item lg={4} md={6} xl={5} xs={12}>
					<Card>
						<CardContent>
							{receivers.length > 0 ? (
								receivers.map((partner, index) => (
									<ReceiverAvatar receiver={partner} />
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
}

export function ThirdStep({ viewer, fileData, receivers }) {
	const dragOver = (e) => {
		e.preventDefault();
		return false;
	};
	const drop = (e, instance) => {
		e.preventDefault();
		return false;
	};
	useEffect(() => {
		WebViewer(
			{
				path: 'webviewer',
			},
			viewer.current
		).then((instance) => {
			// setInstanced(instance);
			const { docViewer, iframeWindow, Annotations } = instance;
			docViewer.loadDocument(fileData.data);
			Annotations.SignatureWidgetAnnotation.prototype.createSignHereElement = function () {
				const div = document.createElement('div');
				div.style.width = '100%';
				div.style.height = '100%';
				div.style.cursor = 'pointer';

				const inlineSvg =
					'<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 25.588 25.588" style="enable-background:new 0 0 25.588 25.588; width: 100%; height: 100%; transform: translateX(-35%);" xml:space="preserve"><g><path style="fill:#030104;" d="M18.724,9.903l3.855,1.416l-3.206,8.729c-0.3,0.821-1.927,3.39-3.06,3.914l-0.275,0.75c-0.07,0.19-0.25,0.309-0.441,0.309c-0.054,0-0.108-0.01-0.162-0.029c-0.243-0.09-0.369-0.359-0.279-0.604l0.26-0.709c-0.575-1.117-0.146-4.361,0.106-5.047L18.724,9.903z M24.303,0.667c-1.06-0.388-2.301,0.414-2.656,1.383l-2.322,6.326l3.854,1.414l2.319-6.325C25.79,2.673,25.365,1.056,24.303,0.667z M17.328,9.576c0.108,0.04,0.219,0.059,0.327,0.059c0.382,0,0.741-0.234,0.882-0.614l2.45-6.608c0.181-0.487-0.068-1.028-0.555-1.208c-0.491-0.178-1.028,0.068-1.209,0.555l-2.45,6.608C16.592,8.855,16.841,9.396,17.328,9.576z M13.384,21.967c-0.253-0.239-0.568-0.537-1.078-0.764c-0.42-0.187-0.829-0.196-1.128-0.203c-0.031,0-0.067-0.001-0.103-0.002c-0.187-0.512-0.566-0.834-1.135-0.96c-0.753-0.159-1.354,0.196-1.771,0.47c0.037-0.21,0.098-0.46,0.143-0.64c0.144-0.58,0.292-1.18,0.182-1.742c-0.087-0.444-0.462-0.774-0.914-0.806c-1.165-0.065-2.117,0.562-2.956,1.129c-0.881,0.595-1.446,0.95-2.008,0.749c-0.686-0.244-0.755-2.101-0.425-3.755c0.295-1.49,0.844-4.264,2.251-5.524c0.474-0.424,1.16-0.883,1.724-0.66c0.663,0.26,1.211,1.352,1.333,2.653c0.051,0.549,0.53,0.952,1.089,0.902c0.55-0.051,0.954-0.539,0.902-1.089c-0.198-2.12-1.192-3.778-2.593-4.329C6.058,7.07,4.724,6.982,3.107,8.429c-1.759,1.575-2.409,4.246-2.88,6.625c-0.236,1.188-0.811,5.13,1.717,6.029c1.54,0.549,2.791-0.298,3.796-0.976c0.184-0.124,0.365-0.246,0.541-0.355c-0.167,0.725-0.271,1.501,0.167,2.155c0.653,0.982,1.576,1.089,2.742,0.321c0.045-0.029,0.097-0.063,0.146-0.097c0.108,0.226,0.299,0.475,0.646,0.645c0.42,0.206,0.84,0.216,1.146,0.224c0.131,0.003,0.31,0.007,0.364,0.031c0.188,0.083,0.299,0.185,0.515,0.389c0.162,0.153,0.333,0.312,0.55,0.476c0.18,0.135,0.39,0.199,0.598,0.199c0.304,0,0.605-0.139,0.801-0.4c0.331-0.442,0.241-1.069-0.201-1.4C13.61,22.183,13.495,22.072,13.384,21.967z"/></g></svg>';
				div.innerHTML = inlineSvg;

				return div;
			};
			const iframeDoc = iframeWindow.document.body;

			iframeDoc.addEventListener('dragover', dragOver);
			iframeDoc.addEventListener('drop', (e) => {
				drop(e, instance);
			});
		});
	}, []);
	return (
		<>
			<Grid>
				<Typography variant="h6" my="1rem">
					Ký tên và các thông tin khác
				</Typography>
			</Grid>
			<Grid display="flex" my="1rem">
				<div style={{ width: '1000px', height: '500px' }} ref={viewer} />
				{/* <Grid item lg={8} md={12} xl={9} xs={12} mr="2rem">
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
								ref={viewer}
							>
								<CloudUpload style={{ fontSize: '4rem' }} />
								<Typography variant="h6">Tải tài liệu</Typography>
							</Box>
						</CardContent>
					</Card>
				</Grid> */}
				<Grid item lg={4} md={6} xl={3} xs={12}>
					{fileData && (
						<div className="preview-file">
							<div
								// data-id={index}
								className="preview-file__item"
								style={{ marginBottom: '1rem' }}
							>
								<div className="preview-file__thumbnail">
									<img
										alt=""
										src={fileData.thumbnailData}
										style={{
											height: '100%',
											width: '100%',
											objectFit: 'contain',
										}}
									/>
								</div>
								<div className="info">
									<span style={{ fontWeight: 'bold', wordWrap: 'break-word' }}>
										{fileData.name}
									</span>
								</div>
							</div>
						</div>
					)}
				</Grid>
			</Grid>
		</>
	);
}

export function LastStep() {
	return (
		<>
			<Grid>
				<Typography variant="h6" my="1rem">
					Kiểm tra và gửi file
				</Typography>
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

	const [fileData, setFileData] = useState(null);
	const [receivers, setReceivers] = useState([]);

	const viewer = useRef(null);
	const filePicker = useRef(null);

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

	const handlePrev = () => {
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
					<Grid item lg={3} sm={6} xl={2} xs={12} display="flex" alignItems="center">
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
					<Grid item lg={9} sm={6} xl={9} xs={12}>
						{activeStep === 0 && (
							<FirstStep
								filePicker={filePicker}
								fileData={fileData}
								setFileData={setFileData}
							/>
						)}
						{activeStep === 1 && (
							<SecondStep receivers={receivers} setReceivers={setReceivers} />
						)}
						{activeStep === 2 && (
							<ThirdStep viewer={viewer} fileData={fileData} receivers={receivers} />
						)}
						{activeStep === 3 && <LastStep />}
						<Grid display="flex" justifyContent="flex-end">
							<FormControlLabel control={<Checkbox />} label="Chỉ mình tôi ký" />
							{activeStep > 0 && (
								<Button variant="outlined" onClick={handlePrev}>
									Quay lại
								</Button>
							)}
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
