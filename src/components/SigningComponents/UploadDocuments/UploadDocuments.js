import React, { useRef, useState } from 'react';
import { CloudUpload } from '@mui/icons-material';
import { Box, Card, CardContent, Container, Grid, Typography, CircularProgress } from '@mui/material';
import '@pdftron/webviewer/public/core/CoreControls';
import { useDispatch, useSelector } from 'react-redux';
import { addDocumentList, removeDocument } from '../../../redux/actions/documentActions';
import './UploadDocuments.scss';
let docList = [];

const UploadDocuments = () => {
	const filePicker = useRef(null);
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

	const documents = useSelector((state) => state.addDocList);

	const setThumbnail = async (selectedFile, filesLength) => {
		const coreControls = window.CoreControls;
		coreControls.setWorkerPath('/webviewer/core');
		const doc = await coreControls.createDocument(selectedFile.data, {
			extension: 'pdf',
		});

		selectedFile.pageCount = doc.getPageCount();
		doc.loadCanvasAsync({
			pageNumber: 1,
			drawComplete: (canvas) => {
				selectedFile.thumbnailData = canvas.toDataURL();
				docList = [...docList, selectedFile];
				if (docList.length === filesLength) {
					dispatch(addDocumentList(docList));
					docList.length = 0;
					setLoading(false);
				}
			},
		});

	};

	const handleSelectFile = (e) => {
		setLoading(true);
		const { files } = e.target;
		for (let file of files) {
			const reader = new FileReader();
			const selectedFile = {
				name: file.name,
			};
			reader.readAsDataURL(file);
			reader.onload = (event) => {
				const data = event.target.result;
				selectedFile.data = data;
				setThumbnail(selectedFile, files.length);
			};
		}
	};

	const handleRemoveFile = e => {
		dispatch(removeDocument(e.target.getAttribute('data-id')))
	}
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
						{loading ? (
							<CircularProgress />
						) : (
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
						)}
					</Card>
					<input
						type="file"
						multiple
						ref={filePicker}
						accept="application/pdf"
						onChange={handleSelectFile}
						style={{ display: 'none' }}
					/>
				</Grid>
				<Grid item xl={3} lg={3} md={3} xs={12}>
					{documents.documentList.length > 0 && (
						<Grid className="preview-file">
							{documents.documentList.map((document, index) => (
								<Grid className="preview-file__item" key={index}>
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
									<Typography
										style={{ color: 'red', textDecoration: 'underline', cursor: "pointer" }}
										data-id={index}
										onClick={handleRemoveFile}
									>
										Xoá
									</Typography>
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
