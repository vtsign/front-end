import React, { useState, useRef, useEffect } from 'react';
import {
	Avatar,
	Box,
	Button,
	Card,
	CardContent,
	Checkbox,
	Container,
	FormControlLabel,
	Grid,
	InputLabel,
	Step,
	StepLabel,
	Stepper,
	TextField,
	Stack,
	IconButton,
	Divider,
	Typography,
	FormControl,
	Select,
	MenuItem,
} from '@mui/material';
import {
	CloudUpload,
	InsertDriveFile,
	BorderColor,
	CalendarToday,
	TextFields,
	PersonOutline,
	MailOutline,
	Computer,
	Brush,
} from '@mui/icons-material';
import { Controller, useForm, useController } from 'react-hook-form';
// import Header from '../../components/Header/Header';
import WebViewer from '@pdftron/webviewer';
import '@pdftron/webviewer/public/core/CoreControls';
// import ReceiverAvatar from '../../components/ReceiverAvatar/ReceiverAvatar';
// import EditFormButton from '../components/EditFormButton/EditFormButton';
// import { addDocumentToSign } from '../../redux/actions/documentActions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import './UploadDocuments.scss'

const UploadDocuments = () => {
	const [fileData, setFileData] = useState(null);
	const filePicker = useRef(null);
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
		<Container maxWidth={false} style={{ height: '100%' }}>
			<Grid>
				<Typography variant="h6" my="1rem">
					Thêm tài liệu
				</Typography>
			</Grid>
			{/* <Typography variant="h5">Thêm tài liệu</Typography> */}
			<Grid container style={{ height: '100%' }}>
				<Grid item xl={9} lg={9} md={9} xs={12}>
					<Card
						onClick={() => {
							if (filePicker) {
								filePicker.current.click();
							}
						}}
						className="upload__button"
					>
						<CardContent>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									flexDirection: 'column',
									color: '#2F80ED',
									cursor: 'pointer',
								}}
							>
								<CloudUpload style={{ fontSize: '5rem' }} />
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
				</Grid>
				<Grid item xl={3} lg={3} md={3} xs={12}>
					{fileData && (
						<Grid className="preview-file">
							<Grid className="preview-file__item">
								<Grid className="preview-file__thumbnail">
									<img
										alt=""
										src={fileData.thumbnailData}
										style={{
											height: '100%',
											width: '100%',
											objectFit: 'contain',
										}}
									/>
								</Grid>
								<Grid className="info">
									<span style={{ fontWeight: 'bold', wordWrap: 'break-word' }}>
										{fileData.name}
									</span>
								</Grid>
							</Grid>
							<Grid className="preview-file__item">
								<Grid className="preview-file__thumbnail">
									<img
										alt=""
										src={fileData.thumbnailData}
										style={{
											height: '100%',
											width: '100%',
											objectFit: 'contain',
										}}
									/>
								</Grid>
								<Grid className="info">
									<span style={{ fontWeight: 'bold', wordWrap: 'break-word' }}>
										{fileData.name}
									</span>
								</Grid>
							</Grid>
							<Grid className="preview-file__item">
								<Grid className="preview-file__thumbnail">
									<img
										alt=""
										src={fileData.thumbnailData}
										style={{
											height: '100%',
											width: '100%',
											objectFit: 'contain',
										}}
									/>
								</Grid>
								<Grid className="info">
									<span style={{ fontWeight: 'bold', wordWrap: 'break-word' }}>
										{fileData.name}
									</span>
								</Grid>
							</Grid>
						</Grid>
					)}
				</Grid>
			</Grid>
		</Container>
	);
};

export default UploadDocuments;
