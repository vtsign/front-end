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
import '@pdftron/webviewer/public/core/CoreControls';
import { useDispatch, useSelector } from 'react-redux';
import './UploadDocuments.scss'
import { addDocumentList } from '../../../redux/actions/documentActions';

	let docList = [];


const UploadDocuments = () => {
	// const [fileData, setFileData] = useState(null);
	const filePicker = useRef(null);

	const dispatch = useDispatch();

	const documents = useSelector(state => state.addDocList);
	console.log(documents);


	const setThumbnail = async (dataFile, object, callback) => {
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
				docList = [...docList, Object];
				callback(docList);
			},
		});
	};

	const handleSelectFile = (e) => {
		const { files } = e.target;

		for(let i = 0; i < files.length; i++) {
			const element = files[i];
			const reader = new FileReader();
			const selectedFile = {
				name: element.name,
			};
			// reader.readAsDataURL(element);
			// reader.onload = (event) => {
			// 	selectedFile.data = event.target.result;
			// 	setThumbnail(event.target.result, selectedFile);
			// };
			console.log(element)
			reader.readAsDataURL(element);
			reader.onload = (event) => {
				selectedFile.data = event.target.result;
				setThumbnail(event.target.result, selectedFile, (documentList) => {
					const docslist = documentList;
					if (docslist.length === files.length) {
						dispatch(addDocumentList(docList));
						docslist.length = 0;
					}
				});
			};
		}

	};
	return (
		<Container maxWidth={false} style={{ height: '100%' }}>
			<Grid>
				<Typography variant="h6" my="1rem">
					Thêm tài liệu
				</Typography>
			</Grid>
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
					{documents.documentList.length > 0 && (
						<Grid className="preview-file">
							{documents.documentList.map((document) => (
								<Grid className="preview-file__item">
									<Grid className="preview-file__thumbnail">
										<img
											alt=""
											src={document.thumbnailData}
											style={{
												height: '100%',
												width: '100%',
												objectFit: 'contain',
											}}
										/>
									</Grid>
									<Grid className="info">
										<span
											style={{ fontWeight: 'bold', wordWrap: 'break-word' }}
										>
											{document.name}
										</span>
									</Grid>
								</Grid>
							))}
						</Grid>
					)}
				</Grid>
			</Grid>
		</Container>
	);
};

export default UploadDocuments;
