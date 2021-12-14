import React, { useContext, useState, useEffect } from 'react';
import { Button, Container, Grid, Step, StepLabel, Stepper } from '@mui/material';
import '@pdftron/webviewer/public/core/CoreControls';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import AddReceivers from '../../components/SigningComponents/AddReceivers/AddReceivers';
import EditDocuments from '../../components/SigningComponents/EditDocuments/EditDocuments';
import SendFiles from '../../components/SigningComponents/SendFiles/SendFiles';
import UploadDocuments from '../../components/SigningComponents/UploadDocuments/UploadDocuments';
import { pdfTronContext } from '../../redux/constants/contexts/pdfTronContext';
import './signing.scss';
import { useToast } from '../../components/toast/useToast.js';
import documentApi from '../../api/documentApi';

const steps = [
	'Thêm tài liệu',
	'Chọn người nhận và cài đặt',
	'Ký tên và các thông tin khác',
	'Kiểm tra và gửi file',
];

const Signing = () => {
	const [activeStep, setActiveStep] = React.useState(0);
	const [files, setFiles] = useState(null);
	const [loading, setLoading] = useState(false);

	const history = useHistory();

	const { handleSendDocuments } = useContext(pdfTronContext);

	const { success, error } = useToast();

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		getValues,
		setValue,
		reset,
		watch,
	} = useForm({
		defaultValues: {
			name: '',
			email: '',
			phone: '',
			permission: 'sign',
			private_message: '',
		},
	});

	const userInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
	console.log(userInfo?.balance / 5000);

	const dispatch = useDispatch();
	const documents = useSelector((state) => state.addDocList.documentList);
	const receivers = useSelector((state) => state.receivers.receivers);
	const [enoughBalance, setEnoughBalance] = useState(parseInt(userInfo?.balance / 5000) > 0);

	useEffect(() => {
		if(receivers.length > 0) {
			setEnoughBalance(parseInt(userInfo.balance / 5000*receivers.length) > 0);
		}
	}, [userInfo.balance, receivers.length])

	const handleNext = () => {
		if (activeStep === 0) {
			if (documents.length === 0) {
				error('Vui lòng tải tài liệu để sử dụng dịch vụ');
				return;
			}
			// if (!enoughBalance) {
			// 	error('Tài khoản của quý khách không đủ để sử dụng dịch vụ. Vui lòng nạp thêm tiền!');
			// 	return;
			// }
		} else if (activeStep === 1) {
			if (receivers.length === 0) {
				error('Vui lòng thêm người nhận tài liệu');
				return;
			}
		}
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const completeSigning = async (formData) => {
		setLoading(true);
		const json = {
			receivers: receivers,
			mail_title: formData.title,
			mail_message: formData.message,
		};

		try {
			const response = await documentApi.postSigning(json, files);
			if (response.status >= 200 && response.status < 300) {
				setLoading(false);
				success('Gửi tài liệu thành công');
				dispatch({
					type: 'RESET_RECEIVERS',
				});
				dispatch({
					type: 'RESET_DOC_LIST',
				});
				history.replace('/');
			} else {
				setLoading(false);
				error(response?.data?.message || 'Có lỗi xảy ra');
			}
		} catch (err) {
			setLoading(false);
			error('Đã có lỗi xảy ra');
		}
	};

	const handlePrev = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleExportFiles = async () => {
		setLoading(true);
		const files = await handleSendDocuments();
		setLoading(false);
		setFiles(files);
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};
	return (
		<Container maxWidth={false}>
			<Grid container className="sign__container">
				<Grid container className="sign__content">
					<Grid item xl={2} lg={2} md={3} xs={12} alignSelf="center">
						<Stepper activeStep={activeStep} orientation="vertical" alignSelf="center">
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
					<Grid item xl={10} lg={10} md={9} xs={12} sx={{ maxHeight: '80vh' }}>
						{activeStep === 0 && (
							<UploadDocuments loading={loading} setLoading={setLoading} enoughBalance={enoughBalance} />
						)}
						{activeStep === 1 && (
							<AddReceivers
								register={register}
								handleSubmit={handleSubmit}
								errors={errors}
								control={control}
								getValues={getValues}
								setValue={setValue}
								reset={reset}
								watch={watch}
								enoughBalance={enoughBalance}
							/>
						)}
						{activeStep === 2 && (
							<EditDocuments
								register={register}
								control={control}
								loading={loading}
								setLoading={setLoading}
							/>
						)}
						{activeStep === 3 && (
							<SendFiles
								register={register}
								errors={errors}
								control={control}
								handleSubmit={handleSubmit}
								loading={loading}
							/>
						)}
					</Grid>
				</Grid>
				<Grid
					item
					xl={12}
					lg={12}
					md={12}
					display="flex"
					justifyContent="flex-end"
					style={{ height: '3rem' }}
				>
					{activeStep > 0 && (
						<Button variant="outlined" onClick={handlePrev}>
							Quay lại
						</Button>
					)}
					{activeStep === 2 ? (
						<Button
							variant="contained"
							style={{ marginLeft: '14px' }}
							onClick={handleExportFiles}
						>
							Tiếp tục
						</Button>
					) : activeStep === 3 ? (
						<Button
							variant="contained"
							style={{ marginLeft: '14px' }}
							onClick={handleSubmit(completeSigning)}
						>
							{activeStep === steps.length - 1 ? 'Gửi' : 'Tiếp tục'}
						</Button>
					) : (
						<Button
							variant="contained"
							style={{ marginLeft: '14px' }}
							onClick={handleNext}
							disabled={loading}
						>
							{activeStep === steps.length - 1 ? 'Gửi' : 'Tiếp tục'}
						</Button>
					)}
				</Grid>
			</Grid>
		</Container>
	);
};

export default Signing;
