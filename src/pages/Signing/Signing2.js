import {
	Button,
	Checkbox,
	Container,
	FormControlLabel,
	Grid,
	Step,
	StepLabel,
	Stepper,
} from '@mui/material';
import '@pdftron/webviewer/public/core/CoreControls';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import AddReceivers from '../../components/SigningComponents/AddReceivers/AddReceivers';
import EditDocuments from '../../components/SigningComponents/EditDocuments/EditDocuments';
import SendFiles from '../../components/SigningComponents/SendFiles/SendFiles';
import UploadDocuments from '../../components/SigningComponents/UploadDocuments/UploadDocuments';
import { addDocumentToSign } from '../../redux/actions/documentActions';
import { pdfTronContext } from '../../redux/constants/contexts/pdfTronContext';
import './signing.scss';

const steps = [
	'Thêm tài liệu (PDF, Word, PNG,...)',
	'Chọn người nhận và cài đặt',
	'Ký tên và các thông tin khác',
	'Kiểm tra và gửi file',
];

const Signing2 = () => {
	const [activeStep, setActiveStep] = React.useState(0);
	const [files, setFiles] = useState(null);

	const history = useHistory();

	const { handleSendDocuments } = useContext(pdfTronContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		setValue,
	} = useForm({
		defaultValues: {
			permission: "sign"
		}
	});

	const dispatch = useDispatch();
	const receivers = useSelector((state) => state.receivers.receivers);

	const handleNext = (formData) => {
		// if(activeStep === 2) {
		// 	(async () => {
		// 		await handleSendDocuments();
		// 		console.log("step 2")
		// 	})();
		// 	// handleSendDocuments();
		// }
		if (activeStep === 3) {
			// handleSendFiles(formData);
			const json = {
				receivers: receivers,
				mail_title: formData.title,
				mail_message: formData.message,
			};

			dispatch(addDocumentToSign(json, files));
			dispatch({
				type: "RESET_RECEIVERS"
			})
			dispatch({
				type: "RESET_DOC_LIST"
			})
			history.push('/');
		}
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handlePrev = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleExportFiles = () => {
		(async () => {
			const files = await handleSendDocuments();
			setFiles(files);
			setActiveStep((prevActiveStep) => prevActiveStep + 1);
		})();
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
					<Grid item xl={10} lg={10} md={9} xs={12}>
						{activeStep === 0 && <UploadDocuments />}
						{activeStep === 1 && (
							<AddReceivers
								register={register}
								handleSubmit={handleSubmit}
								errors={errors}
								control={control}
								setValue={setValue}
							/>
						)}
						{activeStep === 2 && (
							<EditDocuments register={register} control={control} />
						)}
						{activeStep === 3 && <SendFiles register={register} errors={errors} />}
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
					{activeStep === 0 && (
						<FormControlLabel control={<Checkbox />} label="Chỉ mình tôi ký" />
					)}
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
							Gửi
						</Button>
					) : (
						<Button
							variant="contained"
							style={{ marginLeft: '14px' }}
							onClick={handleSubmit(handleNext)}
						>
							{activeStep === steps.length - 1 ? 'Gửi' : 'Tiếp tục'}
						</Button>
					)}
					{/* <Button
						variant="contained"
						style={{ marginLeft: '14px' }}
						onClick={handleSubmit(handleNext)}
					>
						{activeStep === steps.length - 1 ? 'Gửi' : 'Tiếp tục'}
					</Button> */}
				</Grid>
			</Grid>
		</Container>
	);
};

export default Signing2;
